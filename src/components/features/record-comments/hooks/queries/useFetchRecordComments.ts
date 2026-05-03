// src/components/features/record-comments/hooks/queries/useFetchRecordComments.ts
import { useMemo, useState, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";

import { IS_NEW_API } from "@/api/config";
import type {
  IQuery as ILegacyQuery,
  IQueryFetchBoardCommentsArgs,
} from "@/api/graphql/generated/types";
import type { IQuery as INewQuery } from "@/api/graphql/generated/types.new";

import type { RecordComment } from "@/api/adapters/types/record-comment";
import { toRecordComment } from "@/api/adapters/record-comment.adapter";

const FETCH_RECORD_COMMENTS_LEGACY = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      user {
        _id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

const FETCH_RECORD_COMMENTS_NEW = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      id
      content
      user {
        id
        name
        picture
      }
      createdAt
      updatedAt
    }
  }
`;

const PAGE_SIZE = 10;

export const useFetchRecordComments = (recordId?: string) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [prevRecordId, setPrevRecordId] = useState(recordId);

  if (prevRecordId !== recordId) {
    setPrevRecordId(recordId);
    setPage(1);
    setHasMore(true);
  }

  // ✅ 여기서 union 제네릭을 쓰지 말고, 분기해서 타입을 단순화
  const legacyQuery = useQuery<
    Pick<ILegacyQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_RECORD_COMMENTS_LEGACY, {
    variables: { boardId: recordId ?? "", page: 1 },
    skip: !recordId || IS_NEW_API,
    notifyOnNetworkStatusChange: true,
  });

  const newQuery = useQuery<
    Pick<INewQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_RECORD_COMMENTS_NEW, {
    variables: { boardId: recordId ?? "", page: 1 },
    skip: !recordId || !IS_NEW_API,
    notifyOnNetworkStatusChange: true,
  });

  const active = IS_NEW_API ? newQuery : legacyQuery;

  const [prevData, setPrevData] = useState(active.data);
  if (prevData !== active.data) {
    setPrevData(active.data);
    if ((active.data?.fetchBoardComments?.length ?? 0) < PAGE_SIZE) {
      setHasMore(false);
    }
  }

  const comments: RecordComment[] = useMemo(() => {
    return (active.data?.fetchBoardComments ?? []).map((c) =>
      toRecordComment(c),
    );
  }, [active.data?.fetchBoardComments]);

  const loadMore = useCallback(async () => {
    if (!recordId) return;
    if (!hasMore || active.loading) return;

    const nextPage = page + 1;
    const variables = { boardId: recordId, page: nextPage };

    if (IS_NEW_API) {
      await newQuery.fetchMore({
        variables,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.fetchBoardComments) return prev;
          const newComments = fetchMoreResult.fetchBoardComments ?? [];
          if (newComments.length < PAGE_SIZE) setHasMore(false);
          return {
            fetchBoardComments: [
              ...(prev.fetchBoardComments ?? []),
              ...newComments,
            ],
          };
        },
      });
    } else {
      await legacyQuery.fetchMore({
        variables,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.fetchBoardComments) return prev;
          const newComments = fetchMoreResult.fetchBoardComments ?? [];
          if (newComments.length < PAGE_SIZE) setHasMore(false);
          return {
            fetchBoardComments: [
              ...(prev.fetchBoardComments ?? []),
              ...newComments,
            ],
          };
        },
      });
    }

    setPage(nextPage);
  }, [recordId, hasMore, page, active.loading, newQuery, legacyQuery]);

  return {
    comments,
    loading: active.loading,
    error: active.error,
    hasMore,
    loadMore,
    refetch: active.refetch,
  };
};

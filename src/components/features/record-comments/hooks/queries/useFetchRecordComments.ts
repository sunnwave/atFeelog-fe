import { IS_NEW_API } from "@/api/config";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "@/api/graphql/generated/types";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const idField = IS_NEW_API ? "id" : "_id";

const FETCH_RECORD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id: ${idField}
      writer
      contents
      user {
        name
        _id: ${idField}
        email
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const PAGE_SIZE = 10;

export const useFetchRecordComments = (recordId?: string) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, fetchMore, refetch } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_RECORD_COMMENTS, {
    variables: {
      boardId: recordId ?? "",
      page: 1,
    },
    skip: !recordId,
    onCompleted: (result) => {
      if ((result.fetchBoardComments?.length ?? 0) < PAGE_SIZE) {
        setHasMore(false);
      }
    },
  });

  const loadMore = async () => {
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    const result = await fetchMore({
      variables: { boardId: recordId ?? "", page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

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

    if (result) setPage(nextPage);
  };

  return {
    data,
    loading,
    hasMore,
    loadMore,
    refetch,
  };
};

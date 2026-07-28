import { IQuery as INewQuery } from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import { toRecordSummary } from "@/api/adapters/record-summary.adapter";

const FETCH_RECORDS_BY_SHOW = gql`
  query fetchBoardsByMt20id($mt20id: String!, $page: Int) {
    fetchBoardsByMt20id(mt20id: $mt20id, page: $page) {
      id
      title
      showName
      mt20id
      genre
      posterUrl
      artistName
      likeCount
      commentCount
      isLiked
      images
      user {
        id
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchRecordsByShow = (mt20id: string) => {
  const { data, loading, error, fetchMore } = useQuery<
    Pick<INewQuery, "fetchBoardsByMt20id">
  >(FETCH_RECORDS_BY_SHOW, {
    variables: { mt20id, page: 1 },
    skip: !mt20id,
    fetchPolicy: "cache-and-network",
  });

  const seen = new Set<string>();
  const records = (data?.fetchBoardsByMt20id ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b) => toRecordSummary(b as any))
    .filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });

  return { records, data, loading, error, fetchMore };
};

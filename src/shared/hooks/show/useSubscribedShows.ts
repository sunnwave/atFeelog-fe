import { gql, useQuery } from "@apollo/client";
import { IQuery } from "@/api/graphql/generated/types.new";

const FETCH_SUBSCRIBED_PERFORMANCES = gql`
  query fetchSubscribedPerformances {
    fetchSubscribedPerformances
  }
`;

export function useSubscribedShows() {
  const { data, loading } = useQuery<
    Pick<IQuery, "fetchSubscribedPerformances">
  >(FETCH_SUBSCRIBED_PERFORMANCES, {
    fetchPolicy: "cache-and-network",
  });

  const subscribedIds = data?.fetchSubscribedPerformances ?? [];

  const isSubscribed = (mt20id: string) => subscribedIds.includes(mt20id);

  return { subscribedIds, isSubscribed, loading };
}

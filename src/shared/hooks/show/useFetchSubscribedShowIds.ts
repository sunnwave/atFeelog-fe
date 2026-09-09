import { gql, useQuery } from "@apollo/client";
import { IQuery } from "@/api/graphql/generated/types.new";

const FETCH_SUBSCRIBED_PERFORMANCE_IDS = gql`
  query fetchSubscribedPerformances {
    fetchSubscribedPerformances
  }
`;

export function useFetchSubscribedShowIds() {
  const { data, loading, error, refetch } = useQuery<
    Pick<IQuery, "fetchSubscribedPerformances">
  >(FETCH_SUBSCRIBED_PERFORMANCE_IDS, {
    fetchPolicy: "cache-and-network",
  });

  const subscribedIds = data?.fetchSubscribedPerformances ?? [];

  const isSubscribed = (mt20id: string) => subscribedIds.includes(mt20id);

  return { subscribedIds, isSubscribed, loading, error, refetch };
}

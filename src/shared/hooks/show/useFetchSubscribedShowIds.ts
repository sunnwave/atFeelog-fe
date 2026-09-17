import { gql, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import { IQuery } from "@/api/graphql/generated/types.new";

export const FETCH_SUBSCRIBED_PERFORMANCE_IDS = gql`
  query fetchSubscribedPerformances {
    fetchSubscribedPerformances
  }
`;

export function useFetchSubscribedShowIds() {
  const me = useRecoilValue(loggedInUserState);

  const { data, loading, error, refetch } = useQuery<
    Pick<IQuery, "fetchSubscribedPerformances">
  >(FETCH_SUBSCRIBED_PERFORMANCE_IDS, {
    skip: !me,
    fetchPolicy: "cache-and-network",
  });

  const subscribedIds = data?.fetchSubscribedPerformances ?? [];

  const isSubscribed = (mt20id: string) => subscribedIds.includes(mt20id);

  return { subscribedIds, isSubscribed, loading, error, refetch };
}

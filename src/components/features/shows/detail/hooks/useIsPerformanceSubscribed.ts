import { gql, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "@/shared/stores";
import {
  IQuery,
  IQueryIsPerformanceSubscribedArgs,
} from "@/api/graphql/generated/types.new";

const IS_PERFORMANCE_SUBSCRIBED = gql`
  query isPerformanceSubscribed($mt20id: ID!) {
    isPerformanceSubscribed(mt20id: $mt20id)
  }
`;

export function useIsPerformanceSubscribed(mt20id: string) {
  const me = useRecoilValue(loggedInUserState);

  const { data, loading, refetch } = useQuery<
    Pick<IQuery, "isPerformanceSubscribed">,
    IQueryIsPerformanceSubscribedArgs
  >(IS_PERFORMANCE_SUBSCRIBED, {
    variables: { mt20id },
    skip: !me || !mt20id,
  });

  return {
    isSubscribed: data?.isPerformanceSubscribed ?? false,
    loading,
    refetch,
  };
}

import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationTogglePerformanceSubscriptionArgs,
} from "@/api/graphql/generated/types.new";

const TOGGLE_PERFORMANCE_SUBSCRIPTION = gql`
  mutation togglePerformanceSubscription($mt20id: String!) {
    togglePerformanceSubscription(mt20id: $mt20id)
  }
`;

export function useToggleShowLike() {
  const [toggleMutation, { loading }] = useMutation<
    Pick<IMutation, "togglePerformanceSubscription">,
    IMutationTogglePerformanceSubscriptionArgs
  >(TOGGLE_PERFORMANCE_SUBSCRIPTION, {
    refetchQueries: ["fetchSubscribedPerformances"],
  });

  const toggle = async (mt20id: string) => {
    const result = await toggleMutation({ variables: { mt20id } });
    return result.data?.togglePerformanceSubscription;
  };

  return { toggle, loading };
}

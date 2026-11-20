import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";
import {
  IMutation,
  IMutationTogglePerformanceSubscriptionArgs,
  IQuery,
} from "@/api/graphql/generated/types.new";
import { FETCH_SUBSCRIBED_PERFORMANCE_IDS } from "./useFetchSubscribedShowIds";
import { useToast } from "@/components/commons/toast/ToastProvider";

const TOGGLE_PERFORMANCE_SUBSCRIPTION = gql`
  mutation togglePerformanceSubscription($mt20id: String!) {
    togglePerformanceSubscription(mt20id: $mt20id)
  }
`;

const IS_PERFORMANCE_SUBSCRIBED = gql`
  query isPerformanceSubscribed($mt20id: ID!) {
    isPerformanceSubscribed(mt20id: $mt20id)
  }
`;

export function useToggleShowSave() {
  const { error } = useToast();

  const [toggleShowSave] = useMutation<
    Pick<IMutation, "togglePerformanceSubscription">,
    IMutationTogglePerformanceSubscriptionArgs
  >(TOGGLE_PERFORMANCE_SUBSCRIPTION, {
    update(cache, { data }, { variables }) {
      if (!data || !variables) return;
      const { mt20id } = variables;
      const nextSubscribed = data.togglePerformanceSubscription;

      cache.writeQuery({
        query: IS_PERFORMANCE_SUBSCRIBED,
        variables: { mt20id },
        data: { isPerformanceSubscribed: nextSubscribed },
      });

      const existing = cache.readQuery<
        Pick<IQuery, "fetchSubscribedPerformances">
      >({ query: FETCH_SUBSCRIBED_PERFORMANCE_IDS });

      if (existing) {
        const ids = existing.fetchSubscribedPerformances;
        const nextIds = nextSubscribed
          ? ids.includes(mt20id)
            ? ids
            : [...ids, mt20id]
          : ids.filter((id) => id !== mt20id);

        cache.writeQuery({
          query: FETCH_SUBSCRIBED_PERFORMANCE_IDS,
          data: { fetchSubscribedPerformances: nextIds },
        });
      }
    },
  });

  const isPending = useRef(false);

  const toggle = async (mt20id: string) => {
    if (isPending.current) return;
    isPending.current = true;
    try {
      const result = await toggleShowSave({ variables: { mt20id } });
      return result.data?.togglePerformanceSubscription;
    } catch (e) {
      error("찜 처리에 실패했어요. 잠시 후 다시 시도해주세요.");
      throw e;
    } finally {
      isPending.current = false;
    }
  };

  return { toggle };
}

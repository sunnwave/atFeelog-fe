import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryIsConnectedArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";

const IS_CONNECTED = gql`
  query isConnected($followerId: ID!) {
    isConnected(followerId: $followerId)
  }
`;

export const useIsConnected = (followerId?: string) => {
  const { data, loading, refetch } = useQuery<
    Pick<INewQuery, "isConnected">,
    IQueryIsConnectedArgs
  >(IS_CONNECTED, {
    variables: { followerId: followerId ?? "" },
    skip: !IS_NEW_API || !followerId,
    fetchPolicy: "cache-and-network",
  });

  return {
    isConnected: data?.isConnected ?? false,
    loading,
    refetch,
  };
};
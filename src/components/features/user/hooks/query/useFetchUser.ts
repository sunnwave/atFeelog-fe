import { IS_NEW_API } from "@/api/config";
import {
  IQuery as INewQuery,
  IQueryFetchUserArgs,
} from "@/api/graphql/generated/types.new";
import { gql, useQuery } from "@apollo/client";
import type { ProfileUser } from "../../types";

const FETCH_USER = gql`
  query fetchUser($userId: ID!) {
    fetchUser(userId: $userId) {
      id
      name
      description
      picture
    }
  }
`;

export const useFetchUser = (userId?: string) => {
  const { data, loading, error, refetch } = useQuery<
    Pick<INewQuery, "fetchUser">,
    IQueryFetchUserArgs
  >(FETCH_USER, {
    variables: { userId: userId ?? "" },
    skip: !IS_NEW_API || !userId,
    fetchPolicy: "cache-and-network",
  });

  const dto = data?.fetchUser;
  const user: ProfileUser | undefined = dto
    ? {
        id: dto.id,
        name: dto.name,
        description: dto.description ?? undefined,
        picture: dto.picture ?? undefined,
      }
    : undefined;

  return { user, loading, error, refetch };
};

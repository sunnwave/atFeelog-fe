// src/api/adapters/user.adapter.ts
import { IS_NEW_API } from "@/api/config";
import type { IUser as ILegacyUser } from "@/api/graphql/generated/types";
import type { IUser as INewUser } from "@/api/graphql/generated/types.new";
import { User } from "./types/user";

export function toUser(dto: ILegacyUser | INewUser): User {
  return {
    id: IS_NEW_API ? (dto as INewUser).id : (dto as ILegacyUser)._id,
    name: dto.name,
    email: dto.email,
    picture: dto.picture ?? undefined,
  };
}

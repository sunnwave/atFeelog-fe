import { IS_NEW_API } from "../config";
import type { IBoardAddress as ILegacyBoardAddress } from "../graphql/generated/types";
import type { IBoardAddress as INewBoardAddress } from "../graphql/generated/types.new";
import type { Address } from "./types/address";

type Coords = { x?: string; y?: string };

export function toAddress(
  dto: ILegacyBoardAddress | INewBoardAddress | null | undefined,
  coords?: Coords,
): Address | undefined {
  if (!dto) return undefined;

  if (IS_NEW_API) {
    const a = dto as INewBoardAddress;
    return {
      id: a.id,
      placeName: a.placeName ?? undefined,
      roadAddress: a.roadAddress ?? undefined,
      jibunAddress: a.jibunAddress ?? undefined,
      x: a.x ?? undefined,
      y: a.y ?? undefined,
    };
  }

  const a = dto as ILegacyBoardAddress;
  return {
    id: a._id,
    placeName: a.addressDetail ?? undefined,
    roadAddress: a.address ?? undefined,
    jibunAddress: a.zipcode ?? undefined,
    x: coords?.x ?? undefined,
    y: coords?.y ?? undefined,
  };
}

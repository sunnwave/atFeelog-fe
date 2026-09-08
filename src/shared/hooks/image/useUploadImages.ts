import { IS_NEW_API } from "@/api/config";
import { useUploadImagesGraphQL } from "./useUploadImagesGraphQL";
import { useUploadImagesRest } from "./useUploadImagesRest";

export function useUploadImages() {
  const rest = useUploadImagesRest();
  const graphql = useUploadImagesGraphQL();
  return IS_NEW_API ? rest : graphql;
}

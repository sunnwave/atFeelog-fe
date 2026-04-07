import { gql, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import type {
  IMutation,
  IMutationUploadFileArgs,
} from "@/shared/graphql/generated/types";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export function useUploadImages() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const reset = useCallback(() => setError(null), []);

  const uploadImages = useCallback(
    async (filesToUpload?: File[]): Promise<string[]> => {
      const files = filesToUpload ?? [];

      if (files.length === 0) return [];

      setIsUploading(true);
      setError(null);

      try {
        const res = await Promise.all(
          files.map((file) => uploadFile({ variables: { file } }))
        );

        return res
          .map((res) => res.data?.uploadFile.url)
          .filter((url): url is string => Boolean(url));
      } catch (e) {
        const message = e instanceof Error ? e.message : "업로드 실패";
        setError(message);
        throw new Error(message);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadFile]
  );

  return {
    isUploading,
    error,
    uploadImages,
    reset,
  };
}

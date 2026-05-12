import { gql, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import type {
  IMutation,
  IMutationUploadFileArgs,
} from "@/api/graphql/generated/types";
import { IS_NEW_API, getUploadUri } from "@/api/config";
import { accessTokenState } from "@/shared/stores";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

async function uploadViaRest(file: File, accessToken: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(getUploadUri(), {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (!res.ok) throw new Error(`업로드 실패 (${res.status})`);

  const data = await res.json();
  if (!data?.url) throw new Error("업로드 응답에 url이 없습니다");
  return data.url as string;
}

export function useUploadImages() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useRecoilValue(accessTokenState);

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
        if (IS_NEW_API) {
          const urls = await Promise.all(
            files.map((file) => uploadViaRest(file, accessToken ?? "")),
          );
          return urls.filter((url): url is string => Boolean(url)); // 응답에서 URL 양쪽 공백 제거
        }

        const res = await Promise.all(
          files.map((file) => uploadFile({ variables: { file } })),
        );

        return res
          .map((r) => r.data?.uploadFile.url)
          .filter((url): url is string => Boolean(url));
      } catch (e) {
        const message = e instanceof Error ? e.message : "업로드 실패";
        setError(message);
        throw new Error(message);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadFile, accessToken],
  );

  return {
    isUploading,
    error,
    uploadImages,
    reset,
  };
}

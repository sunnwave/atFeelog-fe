import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { getUploadUri } from "@/api/config";
import { accessTokenState } from "@/shared/stores";

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

export function useUploadImagesRest() {
  const accessToken = useRecoilValue(accessTokenState);

  const { mutateAsync, isPending, error, reset } = useMutation({
    mutationFn: (files: File[]) =>
      Promise.all(files.map((file) => uploadViaRest(file, accessToken ?? ""))),
  });

  const uploadImages = async (filesToUpload?: File[]): Promise<string[]> => {
    const files = filesToUpload ?? [];
    if (files.length === 0) return [];
    const urls = await mutateAsync(files);
    return urls.filter((url): url is string => Boolean(url));
  };

  return {
    isUploading: isPending,
    error: error instanceof Error ? error.message : null,
    uploadImages,
    reset,
  };
}

import { useState } from "react";

export function useRetry(refetch: () => Promise<unknown>) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch();
    } catch {
      // Apollo가 useQuery의 error 상태를 알아서 업데이트함
    } finally {
      setIsRetrying(false);
    }
  };

  return { handleRetry, isRetrying };
}

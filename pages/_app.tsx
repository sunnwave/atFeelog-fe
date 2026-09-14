import AuthInitialize from "@/shared/hooks/auth/AuthInitialize";
import Layout from "@/components/commons/layout/Layout";
import ConfirmModalHost from "@/components/commons/modal/confirmModal/ConfirmModalHost";
import { ToastProvider } from "@/components/commons/toast/ToastProvider";
import ApolloSetting from "@/api/graphql/apollo/ApolloSetting";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

type AppComponent = AppProps["Component"] & { noBottomNav?: boolean };

export default function App({ Component, pageProps }: AppProps) {
  const { noBottomNav } = Component as AppComponent;

  const isMswEnabled =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_MSW_ENABLED !== "false";

  const [mswReady, setMswReady] = useState(!isMswEnabled);

  useEffect(() => {
    if (!isMswEnabled) return;
    import("../src/mocks/init")
      .then(({ startMSW }) => startMSW())
      .then(() => setMswReady(true));
  }, [isMswEnabled]);

  if (!mswReady) return null;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ApolloSetting>
            <AuthInitialize />
            <Layout noBottomNav={noBottomNav}>
              <Component {...pageProps} />
              <ConfirmModalHost />
            </Layout>
          </ApolloSetting>
        </ToastProvider>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      </QueryClientProvider>
    </RecoilRoot>
  );
}

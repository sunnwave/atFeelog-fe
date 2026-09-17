let mswPromise: Promise<void> | null = null;

export function startMSW(): Promise<void> {
  if (mswPromise) return mswPromise;
  mswPromise = import("./browser")
    .then(({ worker }) => worker.start({ onUnhandledRequest: "bypass" }))
    .then(() => {});
  return mswPromise;
}

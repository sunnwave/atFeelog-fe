import { atom, type AtomOptions, type RecoilState } from "recoil";

const STORE_KEY = "__recoil_atom_cache__";

type AtomCache = Record<string, RecoilState<unknown>>;

interface CustomGlobal {
  [STORE_KEY]?: AtomCache;
}

export function atomWithDevCache<T>(options: AtomOptions<T>): RecoilState<T> {
  if (process.env.NODE_ENV === "production") return atom<T>(options);

  const g = globalThis as typeof globalThis & CustomGlobal;
  g[STORE_KEY] = g[STORE_KEY] ?? {};
  if (g[STORE_KEY][options.key])
    return g[STORE_KEY]![options.key] as RecoilState<T>;

  g[STORE_KEY]![options.key] = atom<T>(options) as RecoilState<unknown>;
  return g[STORE_KEY]![options.key] as RecoilState<T>;
}

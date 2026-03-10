import { atom, type AtomOptions, type RecoilState } from "recoil";

const STORE_KEY = "__recoil_atom_cache__";

export function atomWithDevCache<T>(options: AtomOptions<T>): RecoilState<T> {
  if (process.env.NODE_ENV === "production") return atom<T>(options);

  const g = globalThis as any;
  g[STORE_KEY] = g[STORE_KEY] ?? {};
  if (g[STORE_KEY][options.key]) return g[STORE_KEY][options.key];

  g[STORE_KEY][options.key] = atom<T>(options);
  return g[STORE_KEY][options.key];
}

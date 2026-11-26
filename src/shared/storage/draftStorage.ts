const DB_NAME = "atfeelog-drafts";
const DB_VERSION = 1;
const STORE_NAME = "drafts";

// 모듈을 불러오거나 서버에서 렌더링할 때는 열지 않고, 브라우저에서 호출할 때만 연결해요.
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("이 환경에서는 초안 저장소를 사용할 수 없어요."));
      return;
    }

    let blocked = false;
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onerror = () => reject(request.error);
    request.onblocked = () => {
      blocked = true;
      reject(new Error("초안 저장소를 열 수 없어요. 다른 탭을 닫고 다시 시도해주세요."));
    };
    request.onsuccess = () => {
      const db = request.result;
      // 차단으로 실패 처리된 연결 요청이 나중에 성공하면 연결을 바로 닫아요.
      if (blocked) {
        db.close();
        return;
      }
      db.onversionchange = () => db.close();
      resolve(db);
    };
  });
}

async function runTransaction<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDatabase();

  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, mode);
      // 개별 요청이 성공해도 트랜잭션이 최종 반영될 때까지 기다려요.
      let request: IDBRequest<T>;
      transaction.oncomplete = () => resolve(request.result);
      transaction.onabort = () => {
        reject(transaction.error ?? new Error("초안 저장 작업이 취소됐어요."));
      };

      try {
        request = operation(transaction.objectStore(STORE_NAME));
      } catch (error) {
        transaction.abort();
        reject(error);
      }
    });
  } finally {
    db.close();
  }
}

export const draftStorage = {
  async save(key: string, value: unknown): Promise<void> {
    await runTransaction("readwrite", (store) => store.put(value, key));
  },

  async saveIfAbsent(key: string, value: unknown): Promise<boolean> {
    try {
      await runTransaction("readwrite", (store) => store.add(value, key));
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === "ConstraintError") return false;
      throw error;
    }
  },

  async load(key: string): Promise<unknown> {
    return runTransaction("readonly", (store) => store.get(key));
  },

  async remove(key: string): Promise<void> {
    await runTransaction("readwrite", (store) => store.delete(key));
  },
};

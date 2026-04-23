import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInfiniteScroll } from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
  let ioCreatedCount: number;
  let observe: ReturnType<typeof vi.fn>;
  let unobserve: ReturnType<typeof vi.fn>;
  let capturedCallback: IntersectionObserverCallback;

  beforeEach(() => {
    ioCreatedCount = 0;
    observe = vi.fn();
    unobserve = vi.fn();
    capturedCallback = () => {};

    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        ioCreatedCount++;
        capturedCallback = cb;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = vi.fn();
    }

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const triggerIntersection = (isIntersecting: boolean) => {
    act(() => {
      capturedCallback(
        [{ isIntersecting } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
  };

  it("hasMore=false면 IntersectionObserver가 등록되지 않음", () => {
    renderHook(() =>
      useInfiniteScroll({ hasMore: false, isLoading: false, onLoadMore: vi.fn() })
    );

    expect(ioCreatedCount).toBe(0);
  });

  it("isLoading=true면 IntersectionObserver가 등록되지 않음", () => {
    renderHook(() =>
      useInfiniteScroll({ hasMore: true, isLoading: true, onLoadMore: vi.fn() })
    );

    expect(ioCreatedCount).toBe(0);
  });

  it("isLoading=true면 sentinel이 진입해도 onLoadMore가 호출되지 않음", () => {
    // isLoading=true 상태에서는 Observer 자체가 생성되지 않으므로
    // intersection이 발생해도 onLoadMore가 호출되지 않는다
    const onLoadMore = vi.fn();
    renderHook(() =>
      useInfiniteScroll({ hasMore: true, isLoading: true, onLoadMore })
    );

    triggerIntersection(true);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("sentinel이 화면에 진입하면 onLoadMore가 호출됨", () => {
    const onLoadMore = vi.fn();
    const { result, rerender } = renderHook(
      ({ onLoadMore }: { onLoadMore: () => void }) =>
        useInfiniteScroll({ hasMore: true, isLoading: false, onLoadMore }),
      { initialProps: { onLoadMore } }
    );

    // ref를 DOM 요소에 연결한 뒤 의존성 변경으로 effect 재실행
    const el = document.createElement("div");
    result.current.current = el;
    const onLoadMore2 = vi.fn();
    rerender({ onLoadMore: onLoadMore2 });

    expect(observe).toHaveBeenCalledWith(el);

    triggerIntersection(true);

    expect(onLoadMore2).toHaveBeenCalledOnce();
  });

  it("컴포넌트 언마운트 시 observer가 해제됨", () => {
    const onLoadMore = vi.fn();
    const { result, rerender, unmount } = renderHook(
      ({ onLoadMore }: { onLoadMore: () => void }) =>
        useInfiniteScroll({ hasMore: true, isLoading: false, onLoadMore }),
      { initialProps: { onLoadMore } }
    );

    const el = document.createElement("div");
    result.current.current = el;
    const onLoadMore2 = vi.fn();
    rerender({ onLoadMore: onLoadMore2 });

    unmount();

    expect(unobserve).toHaveBeenCalledWith(el);
  });
});

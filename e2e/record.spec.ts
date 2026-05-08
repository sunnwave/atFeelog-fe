import { test, expect, type Cookie } from "@playwright/test";
import {
  login,
  createRecord,
  deleteRecord,
  type RecordData,
} from "./helpers";

// ─── 테스트 ────────────────────────────────────────────────────────────────

test.describe.serial("기록 (E2E)", () => {
  // test.use({ storageState: path })는 beforeAll보다 먼저 파일을 읽으므로
  // 첫 실행 시 ENOENT가 발생한다 → 파일 없이 addCookies로 인메모리 적용
  let authCookies: Cookie[] = [];

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await login(page);
    const state = await context.storageState();
    authCookies = state.cookies;
    await context.close();
  });

  test.beforeEach(async ({ context }) => {
    await context.addCookies(authCookies);
  });

  // 각 테스트에서 생성한 기록 ID — afterEach에서 정리
  let createdRecordId = "";

  test.afterEach(async ({ page }, testInfo) => {
    if (!createdRecordId) return;

    try {
      await deleteRecord(page, createdRecordId);
    } catch (e) {
      // cleanup 실패는 테스트 결과를 덮어쓰지 않게 로그만 남김
      testInfo.attach("cleanup-error", {
        body: String(e),
        contentType: "text/plain",
      });
    } finally {
      createdRecordId = "";
    }
  });

  // ── 1. 작성 ──────────────────────────────────────────────────────────────

  test("기록 작성 후 목록에 표시됨", async ({ page }) => {
    const data: RecordData = {
      title: "E2E 테스트 공연 제목",
      showName: "E2E 테스트 공연",
      artistName: "E2E 아티스트",
      showDate: "2026-01-01",
      contents: "E2E 자동 테스트 후기입니다.",
    };

    createdRecordId = await createRecord(page, data);

    await page.goto("/records");

    // RecordCard > RecordCardContent 가 record.title 을 <h3> 으로 렌더링
    await expect(
      page
        .getByRole("heading", { level: 3 })
        .filter({ hasText: data.title })
        .first(),
    ).toBeVisible();
  });

  // ── 2. 유효성 ────────────────────────────────────────────────────────────

  test("필수 항목 미입력 시 유효성 에러 표시됨", async ({ page }) => {
    await page.goto("/records/new");

    await page.getByRole("button", { name: "기록 저장" }).click();

    // 폼이 제출되지 않아 URL 유지
    await expect(page).toHaveURL("/records/new");

    // TextField 에러: border-red-500 클래스 추가
    await expect(page.locator('input[name="showName"]')).toHaveClass(
      /border-red-500/,
    );
    await expect(page.locator('input[name="artistName"]')).toHaveClass(
      /border-red-500/,
    );
    // showDate는 DatePickerInput(버튼)으로 렌더링되므로 트리거 버튼의 클래스를 확인
    await expect(page.getByTestId("date-picker-trigger")).toHaveClass(
      /border-red-500/,
    );

    // TiptapEditor 에러: 에러 문구 직접 렌더링
    await expect(page.getByText("후기를 입력해주세요.")).toBeVisible();
  });

  // ── 3. 수정 ──────────────────────────────────────────────────────────────

  test("기록 수정 후 내용이 변경됨", async ({ page }) => {
    const initial: RecordData = {
      title: "E2E 수정 전 공연 제목",
      showName: "E2E 수정 전 공연",
      artistName: "E2E 아티스트",
      showDate: "2026-01-01",
      contents: "수정 전 후기입니다.",
    };

    createdRecordId = await createRecord(page, initial);

    // 상세 페이지 → WriterMenu → 수정하기
    await page.getByTestId("record-writer-menu").locator("button").click();
    await page.getByRole("button", { name: "수정하기" }).click();
    await page.waitForURL(/\/records\/update\//);

    // 제목·공연명 수정
    const updatedTitle = "E2E 수정 후 공연 제목";
    const updatedShowName = "E2E 수정 후 공연";
    await page.locator('input[name="title"]').fill(updatedTitle);
    await page.locator('input[name="showName"]').fill(updatedShowName);

    // 후기 수정: 전체 선택 후 교체
    await page.locator(".ProseMirror").click();
    await page.keyboard.press("Control+A");
    await page
      .locator(".ProseMirror")
      .pressSequentially("수정된 후기 내용입니다.");

    // 수정하기 제출 (RecordUpdateActions의 type="submit" 버튼)
    await page.getByRole("button", { name: "수정하기" }).click();
    await page.waitForURL(/\/records\/(?!update\/)[^/]+$/);

    // 상세 페이지 h1은 record.title 을 렌더링
    await expect(
      page.getByRole("heading", { level: 1, name: updatedTitle }),
    ).toBeVisible();
  });

  // ── 4. 삭제 ──────────────────────────────────────────────────────────────

  test("기록 삭제 후 목록에서 사라짐", async ({ page }) => {
    const data: RecordData = {
      title: "E2E 삭제 공연 제목",
      showName: "E2E 삭제 공연",
      artistName: "E2E 아티스트",
      showDate: "2026-01-01",
      contents: "삭제될 후기입니다.",
    };

    createdRecordId = await createRecord(page, data);

    const expectedTitle = `${data.showName} - ${data.artistName}`;

    // 상세 페이지 → WriterMenu → 삭제하기 → 모달 확인
    await page.getByTestId("record-writer-menu").locator("button").click();
    await page.getByRole("button", { name: "삭제하기" }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "삭제" })
      .click();
    await page.waitForURL(/\/records\/?$/);

    await expect(
      page.getByRole("heading", { name: expectedTitle }),
    ).not.toBeVisible();

    // afterEach 재삭제 방지
    createdRecordId = "";
  });
});

import { test, expect, type Cookie, type Page } from "@playwright/test";

const EMAIL = process.env.E2E_TEST_EMAIL ?? "";
const PASSWORD = process.env.E2E_TEST_PASSWORD ?? "";

// ─── 헬퍼 ──────────────────────────────────────────────────────────────────

async function login(page: Page) {
  await page.goto("/login");
  await page.getByTestId("login-email").fill(EMAIL);
  await page.getByTestId("login-password").fill(PASSWORD);
  await page.getByTestId("login-submit").click();
  await page.waitForURL("/");
}

type RecordData = {
  showName: string;
  artistName: string;
  showDate: string;
  contents: string;
};

async function fillRecordForm(page: Page, data: RecordData) {
  await page.locator('input[name="showName"]').fill(data.showName);
  await page.locator('input[name="artistName"]').fill(data.artistName);
  await page.locator('input[name="showDate"]').fill(data.showDate);
  await page.locator(".ProseMirror").click();
  await page.locator(".ProseMirror").pressSequentially(data.contents);
}

/** 기록을 작성하고 생성된 recordId를 반환한다. */
async function createRecord(page: Page, data: RecordData): Promise<string> {
  await page.goto("/records/new");
  await fillRecordForm(page, data);
  await page.getByRole("button", { name: "기록 저장" }).click();
  // /records/new, /records/update/* 가 아닌 /records/{id} 를 기다림
  await page.waitForURL(/\/records\/(?!new$|update\/)[^/]+$/);
  return page.url().split("/").pop()!;
}

/** 상세 페이지의 WriterMenu → 삭제하기 → 확인 모달로 기록을 삭제한다. */
async function deleteRecord(page: Page, recordId: string) {
  await page.goto(`/records/${recordId}`);
  await page.locator("button:has(.lucide-ellipsis-vertical)").click();
  await page.getByRole("button", { name: "삭제하기" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "삭제" }).click();
  await page.waitForURL(/\/records$/);
}

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
      showName: "E2E 테스트 공연",
      artistName: "E2E 아티스트",
      showDate: "2026-01-01",
      contents: "E2E 자동 테스트 후기입니다.",
    };

    createdRecordId = await createRecord(page, data);

    await page.goto("/records");

    // RecordCard > RecordCardContent 가 board.title 을 <h3> 으로 렌더링
    const expectedTitle = `${data.showName} - ${data.artistName}`;
    await expect(
      page
        .getByRole("heading", { level: 3 })
        .filter({ hasText: expectedTitle })
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
    await expect(page.locator('input[name="showDate"]')).toHaveClass(
      /border-red-500/,
    );

    // TiptapEditor 에러: 에러 문구 직접 렌더링
    await expect(page.getByText("후기를 입력해주세요.")).toBeVisible();
  });

  // ── 3. 수정 ──────────────────────────────────────────────────────────────

  test("기록 수정 후 내용이 변경됨", async ({ page }) => {
    const initial: RecordData = {
      showName: "E2E 수정 전 공연",
      artistName: "E2E 아티스트",
      showDate: "2026-01-01",
      contents: "수정 전 후기입니다.",
    };

    createdRecordId = await createRecord(page, initial);

    // 상세 페이지 → WriterMenu → 수정하기
    await page.locator("button:has(.lucide-ellipsis-vertical)").click();
    await page.getByRole("button", { name: "수정하기" }).click();
    await page.waitForURL(/\/records\/update\//);

    // 공연명 수정
    const updatedShowName = "E2E 수정 후 공연";
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

    const expectedTitle = `${updatedShowName} - ${initial.artistName}`;
    await expect(
      page.getByRole("heading", { level: 1, name: expectedTitle }),
    ).toBeVisible();
  });

  // ── 4. 삭제 ──────────────────────────────────────────────────────────────

  test("기록 삭제 후 목록에서 사라짐", async ({ page }) => {
    const data: RecordData = {
      showName: "E2E 삭제 공연",
      artistName: "E2E 아티스트",
      showDate: "2026-01-01",
      contents: "삭제될 후기입니다.",
    };

    createdRecordId = await createRecord(page, data);

    const expectedTitle = `${data.showName} - ${data.artistName}`;

    // 상세 페이지 → WriterMenu → 삭제하기 → 모달 확인
    await page.locator("button:has(.lucide-ellipsis-vertical)").click();
    await page.getByRole("button", { name: "삭제하기" }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "삭제" })
      .click();
    await page.waitForURL(/\/records$/);

    await expect(
      page.getByRole("heading", { name: expectedTitle }),
    ).not.toBeVisible();

    // afterEach 재삭제 방지
    createdRecordId = "";
  });
});

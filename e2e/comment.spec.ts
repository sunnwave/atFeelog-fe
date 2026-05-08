import { test, expect, type Cookie, type Page } from "@playwright/test";
import { login, createRecord, deleteRecord } from "./helpers";

// ─── 댓글 헬퍼 ──────────────────────────────────────────────────────────────

/**
 * 댓글 입력창에 텍스트를 입력하고 제출한다.
 * 제출 후 댓글이 목록에 노출될 때까지 기다린다.
 */
async function submitComment(page: Page, text: string) {
  await page.locator("textarea").fill(text);
  await expect(page.locator('[aria-label="Submit comment"]')).toBeEnabled();
  await page.locator('[aria-label="Submit comment"]').click();
  await expect(
    page.locator("p").filter({ hasText: text }).first(),
  ).toBeVisible();
}

/**
 * 특정 댓글의 WriterMenu(MoreVertical 버튼)를 연다.
 * CommentItem 구조: outer-div > div.flex-1 > [content-div | WriterMenu]
 * <p> 기준으로 2번째 상위 div가 WriterMenu 버튼을 포함한다.
 */
async function openCommentMenu(page: Page, commentText: string) {
  await page
    .locator("p")
    .filter({ hasText: commentText })
    .locator("xpath=ancestor::div[2]")
    .locator("button:has(.lucide-ellipsis-vertical)")
    .click();
}

/**
 * 댓글 텍스트로 해당 댓글을 삭제한다. afterEach 정리용.
 * 이미 삭제된 경우 아무것도 하지 않는다.
 */
async function deleteCommentByText(
  page: Page,
  recordId: string,
  commentText: string,
) {
  await page.goto(`/records/${recordId}`);
  const commentP = page.locator("p").filter({ hasText: commentText }).first();
  if (!(await commentP.isVisible())) return;

  await openCommentMenu(page, commentText);
  await page.getByRole("button", { name: "삭제하기" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "삭제" }).click();
  await expect(commentP).not.toBeVisible();
}

// ─── 테스트 ────────────────────────────────────────────────────────────────

test.describe.serial("댓글 (E2E)", () => {
  let authCookies: Cookie[] = [];
  let testRecordId = "";

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await login(page);
    const state = await context.storageState();
    authCookies = state.cookies;
    testRecordId = await createRecord(page, {
      title: "E2E 댓글 테스트용 기록",
      showName: "E2E 댓글 테스트 공연",
      artistName: "E2E 아티스트",
      showDate: "2026-01-01",
      contents: "댓글 E2E 테스트용 기록입니다.",
    });
    await context.close();
  });

  test.afterAll(async ({ browser }) => {
    if (!testRecordId) return;
    const context = await browser.newContext();
    await context.addCookies(authCookies);
    const page = await context.newPage();
    await deleteRecord(page, testRecordId);
    await context.close();
  });

  test.beforeEach(async ({ context, page }) => {
    await context.addCookies(authCookies);
    // networkidle waits for restoreAccessToken + fetchUserLoggedIn API chain to settle
    await page.goto(`/records/${testRecordId}`, { waitUntil: "networkidle" });
  });

  // 각 테스트에서 생성한 댓글 텍스트 — afterEach에서 정리
  let createdCommentText = "";

  test.afterEach(async ({ page }, testInfo) => {
    if (!createdCommentText) return;

    try {
      await deleteCommentByText(page, testRecordId, createdCommentText);
    } catch (e) {
      testInfo.attach("cleanup-error", {
        body: String(e),
        contentType: "text/plain",
      });
    } finally {
      createdCommentText = "";
    }
  });

  // ── 1. 비로그인 ──────────────────────────────────────────────────────────

  test("로그인하지 않으면 댓글 입력창이 비활성화됨", async ({ browser }) => {
    // auth 쿠키 없는 신규 컨텍스트로 직접 접근
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`/records/${testRecordId}`);

    const textarea = page.locator("textarea");
    await expect(textarea).toBeVisible();
    await expect(textarea).toBeDisabled();
    await expect(textarea).toHaveAttribute(
      "placeholder",
      "로그인 후 댓글을 작성해주세요",
    );

    await context.close();
  });

  // ── 2. 작성 ──────────────────────────────────────────────────────────────

  test("댓글 작성 후 목록에 표시됨", async ({ page }) => {
    createdCommentText = "E2E 댓글 작성 테스트입니다.";
    await submitComment(page, createdCommentText);
  });

  // ── 3. 수정 ──────────────────────────────────────────────────────────────

  test("댓글 수정 후 내용이 변경됨", async ({ page }) => {
    const original = "E2E 수정 전 댓글입니다.";
    const updated = "E2E 수정 후 댓글입니다.";

    await submitComment(page, original);

    // WriterMenu → 수정하기
    await openCommentMenu(page, original);
    await page.getByRole("button", { name: "수정하기" }).click();

    // 인라인 수정 폼이 열리고 기존 텍스트가 채워져 있음
    const editTextarea = page.getByTestId("comment-edit-form").locator("textarea");
    await expect(editTextarea).toBeVisible();
    await expect(editTextarea).toHaveValue(original);

    // 내용 교체 후 저장
    await editTextarea.fill(updated);
    await page.getByTestId("comment-edit-form").getByRole("button", { name: "저장" }).click();

    // 수정된 텍스트가 표시되고 수정 폼이 사라짐
    await expect(
      page.locator("p").filter({ hasText: updated }).first(),
    ).toBeVisible();
    await expect(page.getByTestId("comment-edit-form").locator("textarea")).not.toBeVisible();

    // afterEach 정리 대상을 변경된 텍스트로 갱신
    createdCommentText = updated;
  });

  // ── 4. 수정 취소 ─────────────────────────────────────────────────────────

  test("댓글 수정 취소 시 원본 내용이 유지됨", async ({ page }) => {
    createdCommentText = "E2E 취소 테스트 원본 댓글입니다.";
    const modified = "취소 전 임시 변경된 텍스트";

    await submitComment(page, createdCommentText);

    // WriterMenu → 수정하기 → 내용 변경 → 취소
    await openCommentMenu(page, createdCommentText);
    await page.getByRole("button", { name: "수정하기" }).click();
    await page.getByTestId("comment-edit-form").locator("textarea").fill(modified);
    await page.getByRole("button", { name: "취소" }).click();

    // 원본이 다시 표시되고 수정 폼이 사라짐
    await expect(
      page.locator("p").filter({ hasText: createdCommentText }).first(),
    ).toBeVisible();
    await expect(page.getByTestId("comment-edit-form").locator("textarea")).not.toBeVisible();
    await expect(
      page.locator("p").filter({ hasText: modified }),
    ).not.toBeVisible();
  });

  // ── 5. 삭제 ──────────────────────────────────────────────────────────────

  test("댓글 삭제 후 목록에서 사라짐", async ({ page }) => {
    const commentText = "E2E 삭제 테스트 댓글입니다.";

    await submitComment(page, commentText);

    // WriterMenu → 삭제하기 → 확인 모달 → 삭제
    await openCommentMenu(page, commentText);
    await page.getByRole("button", { name: "삭제하기" }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "삭제" })
      .click();

    await expect(
      page.locator("p").filter({ hasText: commentText }),
    ).not.toBeVisible();

    // afterEach 이중 삭제 방지
    createdCommentText = "";
  });

  // ── 6. 빈 댓글 ───────────────────────────────────────────────────────────

  test("빈 댓글은 제출되지 않음", async ({ page }) => {
    const submitBtn = page.locator('[aria-label="Submit comment"]');

    // 아무것도 입력하지 않으면 버튼 비활성화
    await expect(submitBtn).toBeDisabled();

    // 공백만 입력해도 비활성화 유지
    await page.locator("textarea").fill("   ");
    await expect(submitBtn).toBeDisabled();
  });
});

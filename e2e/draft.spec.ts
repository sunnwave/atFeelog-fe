import { test, expect, type Page } from "@playwright/test";

const EMAIL = process.env.E2E_TEST_EMAIL ?? "";
const PASSWORD = process.env.E2E_TEST_PASSWORD ?? "";
const DRAFT_KEY = "record:draft:write";

async function login(page: Page) {
  await page.goto("/login");
  await page.getByTestId("login-email").fill(EMAIL);
  await page.getByTestId("login-password").fill(PASSWORD);
  await page.getByTestId("login-submit").click();
  await page.waitForURL("/");
}

async function clearDraft(page: Page) {
  await page.evaluate((key) => localStorage.removeItem(key), DRAFT_KEY);
}

async function fillForm(page: Page, showName: string, contents: string) {
  await page.locator('input[name="showName"]').fill(showName);
  await page.locator(".ProseMirror").click();
  await page.locator(".ProseMirror").pressSequentially(contents);
}

async function saveDraft(page: Page) {
  await page.getByRole("button", { name: "임시 저장" }).click();
  await expect(page.getByText("텍스트 내용이 임시저장됐어요")).toBeVisible();
}

test.describe("임시저장 (E2E)", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await clearDraft(page);
  });

  test("임시저장 버튼 클릭 시 토스트 메시지가 표시됨", async ({ page }) => {
    await page.goto("/records/new");
    await fillForm(page, "서울재즈페스티벌 2026", "정말 멋진 공연이었습니다.");

    await page.getByRole("button", { name: "임시 저장" }).click();

    await expect(page.getByText("텍스트 내용이 임시저장됐어요")).toBeVisible();
  });

  test("임시저장 후 재진입 시 복구 모달이 표시됨", async ({ page }) => {
    await page.goto("/records/new");
    await fillForm(page, "서울재즈페스티벌 2026", "정말 멋진 공연이었습니다.");
    await saveDraft(page);

    await page.goto("/records");
    await page.goto("/records/new");

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("임시 저장된 내용이 있어요")).toBeVisible();
  });

  test("복구 확인 시 입력했던 내용이 폼에 채워짐", async ({ page }) => {
    const showName = "서울재즈페스티벌 2026";
    const contents = "정말 멋진 공연이었습니다.";

    await page.goto("/records/new");
    await fillForm(page, showName, contents);
    await saveDraft(page);

    await page.goto("/records");
    await page.goto("/records/new");

    await page
      .getByRole("dialog")
      .getByRole("button", { name: "이어서 작성" })
      .click();

    await expect(page.locator('input[name="showName"]')).toHaveValue(showName);
    await expect(page.locator(".ProseMirror")).toContainText(contents);
  });

  test("복구 후 내용 수정해도 복구 모달이 다시 뜨지 않음", async ({
    page,
  }) => {
    await page.goto("/records/new");
    await fillForm(page, "서울재즈페스티벌 2026", "정말 멋진 공연이었습니다.");
    await saveDraft(page);

    await page.goto("/records");
    await page.goto("/records/new");

    await page
      .getByRole("dialog")
      .getByRole("button", { name: "이어서 작성" })
      .click();

    // form.reset() 후 리렌더링 시 모달이 다시 열리는 회귀 버그 방지
    await page.locator('input[name="showName"]').fill("수정된 공연명");

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("복구 취소 시 폼이 비어있음", async ({ page }) => {
    await page.goto("/records/new");
    await fillForm(page, "서울재즈페스티벌 2026", "정말 멋진 공연이었습니다.");
    await saveDraft(page);

    await page.goto("/records");
    await page.goto("/records/new");

    await page
      .getByRole("dialog")
      .getByRole("button", { name: "새로 작성" })
      .click();

    await expect(page.locator('input[name="showName"]')).toHaveValue("");
    await expect(page.locator(".ProseMirror")).not.toContainText(
      "정말 멋진 공연이었습니다.",
    );
  });

  test("복구 취소 후 재진입 시 모달이 뜨지 않음", async ({ page }) => {
    await page.goto("/records/new");
    await fillForm(page, "서울재즈페스티벌 2026", "정말 멋진 공연이었습니다.");
    await saveDraft(page);

    await page.goto("/records");
    await page.goto("/records/new");

    await page
      .getByRole("dialog")
      .getByRole("button", { name: "새로 작성" })
      .click();

    // 취소 시 clearDraft 동작 확인 - 재진입해도 모달 미표시
    await page.goto("/records");
    await page.goto("/records/new");

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("임시저장 없이 진입 시 모달이 뜨지 않음", async ({ page }) => {
    // beforeEach에서 localStorage 초기화 완료 상태
    await page.goto("/records/new");

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});

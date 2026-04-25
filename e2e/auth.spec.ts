import { test, expect, type Page } from "@playwright/test";

const EMAIL = process.env.E2E_TEST_EMAIL ?? "";
const PASSWORD = process.env.E2E_TEST_PASSWORD ?? "";

// Desktop Chrome viewport(1280px)는 Tailwind lg(1024px) 이상이므로 SideNav가 렌더됨
async function login(page: Page) {
  console.log(EMAIL, PASSWORD);
  await page.goto("/login");
  // FormLabel(htmlFor) + input(id) 매핑 기반 셀렉터
  await page.getByTestId("login-email").fill(EMAIL);
  await page.getByTestId("login-password").fill(PASSWORD);

  await expect(page.getByTestId("login-email")).toHaveValue(EMAIL);
  await expect(page.getByTestId("login-password")).toHaveValue(PASSWORD);

  await expect(page.getByTestId("login-submit")).toBeEnabled();
  await page.getByTestId("login-submit").click();
  await page.waitForURL("/");
}

test.describe("인증 (E2E)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("로그인 성공 시 refreshToken 쿠키가 저장됨", async ({
    page,
    context,
  }) => {
    await login(page);

    const cookies = await context.cookies();
    const refreshToken = cookies.find((c) => c.name === "refreshToken");
    expect(refreshToken).toBeDefined();
  });

  test("새로고침 후 로그인이 유지됨", async ({ page }) => {
    await login(page);

    await page.reload();

    // 데스크탑 SideNav에 로그아웃 버튼이 보이면 로그인 상태 유지됨
    await expect(page.getByRole("button", { name: "로그아웃" })).toBeVisible();
  });

  test("로그아웃 후 쿠키가 삭제됨", async ({ page, context }) => {
    await login(page);

    // SideNav 로그아웃 버튼 클릭 → 확인 모달의 "로그아웃" 버튼 클릭
    await page.getByRole("button", { name: "로그아웃" }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "로그아웃" })
      .click();

    await page.waitForResponse(
      (res) => res.url().includes("/api/logout") && res.ok(),
    );

    const cookies = await context.cookies();
    const refreshToken = cookies.find((c) => c.name === "refreshToken");
    expect(refreshToken).toBeUndefined();
  });
});

import { expect, type Page } from "@playwright/test";

export const EMAIL = process.env.E2E_TEST_EMAIL ?? "";
export const PASSWORD = process.env.E2E_TEST_PASSWORD ?? "";

// ─── 인증 ────────────────────────────────────────────────────────────────────

export async function login(page: Page) {
  await page.goto("/login");
  await page.getByTestId("login-email").fill(EMAIL);
  await page.getByTestId("login-password").fill(PASSWORD);
  await page.getByTestId("login-submit").click();
  await page.waitForURL("/");
}

// ─── 날짜 ────────────────────────────────────────────────────────────────────

/**
 * DatePickerInput(커스텀 달력)으로 날짜를 선택한다.
 * dateStr: "yyyy-MM-dd" 형식.
 * DayPicker v9 + ko 로케일 기준으로 캡션은 "yyyy년 M월" 형태로 렌더링된다.
 */
export async function selectDate(page: Page, dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);

  await page.getByTestId("date-picker-trigger").click();

  const calendar = page.getByTestId("date-picker-calendar");
  await calendar.waitFor();

  const now = new Date();
  const monthsBack =
    (now.getFullYear() - year) * 12 + (now.getMonth() - (month - 1));

  const navBtn =
    monthsBack > 0
      ? calendar.getByRole("button", { name: /previous/i })
      : calendar.getByRole("button", { name: /next/i });

  for (let i = 0; i < Math.abs(monthsBack); i++) {
    await navBtn.click();
  }

  await expect(calendar.getByText(new RegExp(`${year}년`))).toContainText(
    new RegExp(`${month}월`),
  );

  // .first() prevents outside-day collision (e.g. Feb 1 shown at end of Jan grid)
  await calendar.locator(`button:text-is("${day}")`).first().click();

  await calendar.waitFor({ state: "detached" });
}

// ─── 기록 ────────────────────────────────────────────────────────────────────

export type RecordData = {
  title: string;
  showName: string;
  artistName: string;
  showDate: string;
  contents: string;
};

export async function fillRecordForm(page: Page, data: RecordData) {
  await page.locator('input[name="title"]').fill(data.title);
  await page.locator('input[name="showName"]').fill(data.showName);
  await page.locator('input[name="artistName"]').fill(data.artistName);
  await selectDate(page, data.showDate);
  await page.locator(".ProseMirror").click();
  await page.locator(".ProseMirror").pressSequentially(data.contents);
}

/** 기록을 작성하고 생성된 recordId를 반환한다. */
export async function createRecord(
  page: Page,
  data: RecordData,
): Promise<string> {
  await page.goto("/records/new");
  await fillRecordForm(page, data);
  await page.getByRole("button", { name: "기록 저장" }).click();
  await page.waitForURL(/\/records\/(?!new$|update\/)[^/]+$/);
  return page.url().split("/").pop()!;
}

/** 상세 페이지의 WriterMenu → 삭제하기 → 확인 모달로 기록을 삭제한다. */
export async function deleteRecord(page: Page, recordId: string) {
  await page.goto(`/records/${recordId}`, { waitUntil: "networkidle" });
  await page.getByTestId("record-writer-menu").locator("button").click();
  await page.getByRole("button", { name: "삭제하기" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "삭제" }).click();
  await page.waitForURL(/\/records\/?$/);
}

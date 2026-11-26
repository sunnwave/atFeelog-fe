import { test, expect, type Page } from "@playwright/test";
import { RECORD_WRITE_DEFAULTS } from "../src/components/features/record/model/types";
import { DRAFT_KEY } from "../src/shared/constants/draftKeys";
import { selectDate } from "./helpers";

const userId = "draft-e2e-user";
const otherUserId = "draft-e2e-other-user";
const recordId = "draft-e2e-record";
const writePath = "/feelog/new";
const editPath = `/feelog/${recordId}/edit`;
const showName = "서울재즈페스티벌";
const contents = "정말 멋진 공연이었습니다.";
const savedMessage = "사진과 작성 내용이 임시저장됐어요.";
const photo = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4H8oAAAOrAVWkfcZwAAAAAElFTkSuQmCC",
  "base64",
);

function action(page: Page, name: string) {
  return page.getByRole("button", { name, exact: true });
}

function restoreDialog(page: Page) {
  return page.getByRole("dialog", { name: "임시 저장된 내용이 있어요" });
}

async function fillDraft(page: Page) {
  await page.locator('input[name="showName"]').fill(showName);
  await page.locator(".ProseMirror").click();
  await page.locator(".ProseMirror").pressSequentially(contents);
}

async function saveDraft(page: Page) {
  await action(page, "임시 저장").click();
  await expect(page.getByText(savedMessage, { exact: true })).toBeVisible();
  await expect(action(page, "임시 저장")).toBeDisabled();
}

async function switchAccount(page: Page, email: string) {
  const logout = page.getByTestId("logout-button");
  await logout.click();
  await page.getByRole("dialog").getByRole("button", { name: "로그아웃", exact: true }).click();
  await expect(logout).toBeHidden();

  await page.goto(`/login?redirect=${encodeURIComponent(writePath)}`);
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill("draft-e2e-password");
  await page.getByTestId("login-submit").click();
  await page.waitForURL(writePath);
}

test.describe("기록 임시저장 (IndexedDB)", () => {
  test.beforeEach(async ({ page }) => {
    const user = { id: userId, _id: userId, name: "E2E 사용자", email: "draft@example.test", picture: null, createdAt: "2026-01-01" };
    const otherUser = { ...user, id: otherUserId, _id: otherUserId, name: "E2E 다른 사용자", email: "other-draft@example.test" };
    let signedInUser: typeof user | null = user;
    const board = {
      id: recordId, _id: recordId, title: "서버 기록 제목", showName: "서버 공연명",
      artistName: "서버 아티스트", showDate: "2026-01-01", mt20id: null, writer: user.name,
      contents: "<!--META\nshowName: 서버 공연명\nartistName: 서버 아티스트\nshowDate: 2026-01-01\n-->\n\n<p>서버에 저장된 후기입니다.</p>",
      images: [], likeCount: 0, commentCount: 0, isLiked: false, boardAddress: null,
      user, createdAt: "2026-01-01", updatedAt: "2026-01-01",
    };
    const responses: Record<string, object> = {
      fetchBoard: { fetchBoard: board },
      createBoard: { createBoard: { id: recordId, images: [] } },
      updateBoard: { updateBoard: { _id: recordId } },
    };
    // 인증과 기록 API만 모의 처리하고 브라우저 저장소는 실제 사용
    await page.route("**/api/graphql", (route) => {
      const request = route.request().postDataJSON() as {
        operationName?: string;
        query?: string;
        variables?: { email?: string };
      } | null;
      const operation = request?.operationName ?? request?.query?.match(/\b(?:query|mutation)\s+(\w+)/)?.[1];
      if (operation === "loginUser") {
        signedInUser = [user, otherUser].find((account) => account.email === request?.variables?.email) ?? null;
        return route.fulfill({ json: { data: { loginUser: { accessToken: signedInUser?.id ?? null } } } });
      }
      if (operation === "logoutUser") {
        signedInUser = null;
        return route.fulfill({ json: { data: { logoutUser: true } } });
      }
      if (operation === "restoreAccessToken") {
        return route.fulfill({ json: { data: { restoreAccessToken: { accessToken: signedInUser?.id ?? null } } } });
      }
      if (operation === "fetchUserLoggedIn") {
        return route.fulfill({ json: { data: { fetchUserLoggedIn: signedInUser } } });
      }
      return route.fulfill({ json: { data: responses[operation ?? ""] ?? {} } });
    });
    await page.route("**/api/logout", (route) => route.fulfill({ status: 200, json: { ok: true } }));
  });

  test("새로고침 후 작성 초안의 글과 사진 미리보기를 복원한다", async ({ page }) => {
    await page.goto(writePath);
    await fillDraft(page);
    await page.locator('input[type="file"]').setInputFiles({
      name: "draft.png", mimeType: "image/png", buffer: photo,
    });
    await saveDraft(page);
    await page.reload();
    await restoreDialog(page).getByRole("button", { name: "이어서 작성" }).click();

    await expect(page.locator('input[name="showName"]')).toHaveValue(showName);
    await expect(page.locator(".ProseMirror")).toContainText(contents);
    const preview = page.getByRole("img", { name: "Preview 1" });
    await preview.scrollIntoViewIfNeeded();
    await expect.poll(() => preview.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(action(page, "임시 저장")).toBeDisabled();

    await page.locator('input[name="showName"]').fill("바뀐 공연명");
    await expect(action(page, "임시 저장")).toBeEnabled();
    await expect(restoreDialog(page)).toBeHidden();
  });

  test("새로 작성을 선택하면 폼을 비운 상태로 유지하고 다시 진입해도 복원 모달을 열지 않는다", async ({ page }) => {
    await page.goto(writePath);
    await fillDraft(page);
    await saveDraft(page);
    await page.reload();
    await restoreDialog(page).getByRole("button", { name: "새로 작성" }).click();

    await expect(action(page, "저장하기")).toBeEnabled();
    await expect(page.locator('input[name="showName"]')).toHaveValue("");
    await expect(page.locator(".ProseMirror")).not.toContainText(contents);
    await page.reload();
    await expect(action(page, "저장하기")).toBeEnabled();
    await expect(restoreDialog(page)).toBeHidden();
  });

  test("사용자별 localStorage 초안만 이전하고 공용 초안은 남긴다", async ({ page }) => {
    await page.goto(writePath);
    await expect(action(page, "저장하기")).toBeEnabled();
    const key = DRAFT_KEY.record.write(userId);
    const commonKey = "record:draft:write";
    const values = { ...RECORD_WRITE_DEFAULTS, showName, contents };
    await page.evaluate(({ key, commonKey, values }) => {
      localStorage.setItem(key, JSON.stringify(values));
      localStorage.setItem(commonKey, JSON.stringify({ ...values, showName: "공용 초안" }));
    }, { key, commonKey, values });
    await page.reload();
    await restoreDialog(page).getByRole("button", { name: "이어서 작성" }).click();

    await expect(page.locator('input[name="showName"]')).toHaveValue(showName);
    expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBeNull();
    expect(await page.evaluate((key) => localStorage.getItem(key), commonKey)).not.toBeNull();
    await page.reload();
    await restoreDialog(page).getByRole("button", { name: "새로 작성" }).click();
    await expect(action(page, "저장하기")).toBeEnabled();
    await page.reload();
    await expect(action(page, "저장하기")).toBeEnabled();
    await expect(restoreDialog(page)).toBeHidden();
  });

  test("같은 브라우저에서 B로 로그인해도 A 초안을 불러오지 않는다", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto(writePath);
    await fillDraft(page);
    await saveDraft(page);

    await switchAccount(page, "other-draft@example.test");
    await expect(page.locator(`a[href="/user/${otherUserId}"]`)).toBeVisible();
    await expect(action(page, "저장하기")).toBeEnabled();
    await expect(restoreDialog(page)).toBeHidden();
    const performance = page.locator('input[name="showName"]');
    await expect(performance).toHaveValue("");
    await expect(page.locator(".ProseMirror")).not.toContainText(contents);

    await performance.fill("B의 공연");
    await saveDraft(page);
    await switchAccount(page, "draft@example.test");
    await expect(page.locator(`a[href="/user/${userId}"]`)).toBeVisible();
    await restoreDialog(page).getByRole("button", { name: "이어서 작성" }).click();
    await expect(performance).toHaveValue(showName);
    await expect(page.locator(".ProseMirror")).toContainText(contents);
  });

  test("최종 등록 성공 후 작성 초안을 삭제한다", async ({ page }) => {
    await page.goto(writePath);
    await fillDraft(page);
    await page.locator('input[name="title"]').fill("작성 초안 제목");
    await page.locator('input[name="artistName"]').fill("공연 아티스트");
    const previousMonth = new Date();
    previousMonth.setDate(1);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    await selectDate(page, `${previousMonth.getFullYear()}-${previousMonth.getMonth() + 1}-1`);
    await saveDraft(page);

    await action(page, "저장하기").click();
    await expect(page).toHaveURL(`/feelog/${recordId}`);
    await page.goto(writePath);
    await expect(action(page, "저장하기")).toBeEnabled();
    await expect(restoreDialog(page)).toBeHidden();
  });

  test("수정 화면에서 초안을 복원하고 최종 수정 후 삭제한다", async ({ page }) => {
    await page.goto(editPath);
    const title = page.locator('input[name="title"]');
    await expect(title).toHaveValue("서버 기록 제목");
    await title.fill("수정 초안 제목");
    await saveDraft(page);
    await page.reload();
    await restoreDialog(page).getByRole("button", { name: "이어서 작성" }).click();
    await expect(title).toHaveValue("수정 초안 제목");

    await action(page, "수정하기").click();
    await expect(page).toHaveURL(`/feelog/${recordId}`);
    await page.goto(editPath);
    await expect(action(page, "수정하기")).toBeEnabled();
    await expect(restoreDialog(page)).toBeHidden();
  });
});

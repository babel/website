import { argosScreenshot } from "@argos-ci/playwright";
import { expect, test } from "@playwright/test";

test.setTimeout(60_000);

const pages = [
  { name: "docs", path: "/docs", heading: "What is Babel?" },
  { name: "setup", path: "/setup", heading: "Using Babel" },
  { name: "videos", path: "/videos", heading: "Videos" },
  { name: "blog", path: "/blog", heading: null },
  { name: "team", path: "/team", heading: "Meet the Team" },
  { name: "users", path: "/users", heading: "See who is using Babel" },
  { name: "support", path: "/support", heading: "Support the Team" },
  { name: "versions", path: "/versions", heading: "Babel Versions" },
];

for (const { name, path, heading } of pages) {
  test(`${name} page visual regression`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);

    if (heading) {
      await expect(
        page.getByRole("heading", { name: heading, exact: true })
      ).toBeVisible();
    } else {
      await expect(page.locator("article header h2").first()).toBeVisible();
    }

    await argosScreenshot(page, name, {
      fullPage: true,
      // Exclude third-party player content while preserving its layout.
      mask: name === "videos" ? [".babel-video-play iframe"] : [],
    });
  });
}

test("home page visual regression", async ({ page }) => {
  const response = await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", {
      name: "Babel is a JavaScript compiler.",
      exact: true,
    })
  ).toBeVisible();
  await expect(page.locator(".hero-repl--visible")).toBeVisible({
    timeout: 30_000,
  });

  // Clicking the input stops the random typing demo and clears both editors.
  await page.locator("#hero-repl-in").click();
  await page
    .locator("#hero-repl-in textarea")
    .pressSequentially("const answer = 42;");
  await expect(page.locator("#hero-repl-out .ace_text-layer")).toContainText(
    /answer\s*=\s*42/,
    { timeout: 30_000 }
  );
  await expect(page.locator(".hero-repl__error--visible")).toHaveCount(0);

  await argosScreenshot(page, "home", { fullPage: true });
});

test("repl page visual regression", async ({ page }) => {
  const code = encodeURIComponent("const answer = 42;");
  const response = await page.goto(`/repl#?code=${code}`, {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status()).toBe(200);

  const editors = page.locator(".monaco-editor");
  await expect(editors).toHaveCount(2, { timeout: 30_000 });
  await expect(editors.nth(0)).toBeVisible();
  await expect(editors.nth(1).locator(".view-lines")).toContainText(
    /answer\s*=\s*42/,
    { timeout: 30_000 }
  );

  await argosScreenshot(page, "repl", { fullPage: true });
});

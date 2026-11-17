import { expect, test, type Page } from "@playwright/test";

test.setTimeout(60_000);

async function openReplConsole(page: Page, code: string, evaluate: boolean) {
  const response = await page.goto(
    `/repl#?evaluate=${evaluate}&code=${encodeURIComponent(code)}`,
    { waitUntil: "domcontentloaded" }
  );
  expect(response?.status()).toBe(200);

  await page
    .locator(".pills__item", { hasText: /^console$/ })
    .click({ timeout: 30_000 });
}

test("repl console shows the output of the evaluated code", async ({
  page,
}) => {
  await openReplConsole(
    page,
    [
      'console.log("answer:", { value: 42, list: [1, "two"] });',
      'console.warn("%s is deprecated", "foo");',
      "setTimeout(() => { throw new Error('async'); });",
      "throw new TypeError('sync');",
    ].join("\n"),
    true
  );

  const entries = page.getByRole("log").locator("pre");
  await expect(entries).toHaveText(
    [
      'answer: { value: 42, list: [ 1, "two" ] }',
      "foo is deprecated",
      "Uncaught TypeError: sync",
      "Uncaught Error: async",
    ],
    { timeout: 30_000 }
  );
});

test("repl console asks to enable evaluation", async ({ page }) => {
  await openReplConsole(page, 'console.log("hello");', false);

  await expect(
    page.getByText('Enable "Evaluate" in the settings')
  ).toBeVisible();
});

import test from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("https://example.com");
  const title = page.locator("h1");
  await test.expect(title).toHaveText("Example Domain");
});

const data = [1, 2, 3];
for (const num of data) {
  test(`data-driven test for number ${num}`, async ({ page }) => {
    await page.goto("https://example.com");
    const title = page.locator("h1");
    await test.expect(title).toHaveText("Example Domain");
  });
}

test.describe("grouped tests", () => {
  test("empty test", () => {});
  test("first test in group", async ({ page }) => {
    await page.goto("https://example.com");
    const title = page.locator("h1");
    await test.expect(title).toHaveText("Example Domain");
  });

  test("second test in group", async ({ page }) => {
    await page.goto("https://example.com");
    const title = page.locator("h1");
    await test.expect(title).toHaveText("Example Domain");
  });
});

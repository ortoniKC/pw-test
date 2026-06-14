import test from "@playwright/test";

test.skip("basic test", async ({ page }) => {
  await page.goto("https://example.com");
  const title = page.locator("h1");
  await test.expect(title).toHaveText("Example Domain");
});

const data = [1, 2, 3];
for (const num of data) {
  test.skip(`data-driven test for number ${num}`, async ({ page }) => {
    await page.goto("https://example.com");
    const title = page.locator("h1");
    await test.expect(title).toHaveText("Example Domain");
  });
}

test.describe("grouped tests", () => {
  test.skip("empty test", () => {});
  test.skip("first test in group", async ({ page }) => {
    await page.goto("https://example.com");
    const title = page.locator("h1");
    await test.expect(title).toHaveText("Example Domain");
  });

  test("second test in group", async ({ page }) => {
    await page.goto("https://example.com");
    const title = page.locator("h1");
    await test.expect(title).toHaveText("Example Domain1");
  });
});

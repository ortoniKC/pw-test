import { test, expect } from "@playwright/test";

test.use({ headless: true });
test.setTimeout(10000);
test("Handle new tab and interact with Edit page", async ({
  page,
}, testInfo) => {
  // Step 1: Go to https://letcode.in/window
  await test.step("Navigate to LetCode Window page", async () => {
    await page.goto("https://letcode.in/window");
    await testInfo.attach("Step 1 - Window Page", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });

  // Step 2: Click on #home (opens new tab)
  const [newPage] = await Promise.all([
    page.context().waitForEvent("page"),
    page.locator("#home").click(),
  ]);
  await newPage.waitForLoadState();
  await test.step("Click on Home and open new tab", async () => {
    await testInfo.attach("Step 2 - New Tab Opened", {
      body: await newPage.screenshot(),
      contentType: "image/png",
    });
  });

  // Step 3: In new tab, click on "Edit"
  await test.step("Click on Edit link in new tab", async () => {
    await newPage.click("a:has-text('Edit')");
    await testInfo.attach("Step 3 - After Edit Click", {
      body: await newPage.screenshot(),
      contentType: "image/png",
    });
  });

  // Step 4: Enter "koushik" in the first text box
  await test.step("Enter text in first input box", async () => {
    await page.pause();
    const firstInput = newPage.locator(
      "input[placeholder='Enter first & last name']"
    );
    await firstInput.fill("koushik", { timeout: 2000 });
    await testInfo.attach("Step 4 - Text Entered", {
      body: await newPage.screenshot(),
      contentType: "image/png",
    });
  });

  // Step 5: Close the new tab
  await test.step("Close the new tab", async () => {
    await newPage.close();
    await testInfo.attach("Step 5 - New Tab Closed", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });
});

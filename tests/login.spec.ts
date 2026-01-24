import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { credentials } from "../utils/test-data";

test("User can log in successfully @login @smoke", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/\/home/);
});

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { LoginPage } from "../pages/login.page";
import { credentials } from "../utils/test-data";

test("User can view product details and add to cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);

  await homePage.goto();
  await homePage.selectFirstProduct();

  await productPage.addToCart();
  await expect(page.locator(".mat-mdc-snack-bar-label").last()).toContainText(
    "added to cart!"
  );
  console.log(credentials.username, credentials.password);
});

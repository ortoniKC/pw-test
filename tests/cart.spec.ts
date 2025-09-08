import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { credentials } from "../utils/test-data";
// test.use({ headless: false });
test.describe("Cart test", () => {
  test.describe("User can modify @cart", () => {
    test(
      "User can modify cart and checkout",
      {
        annotation: {
          type: "basic test",
          description: "Test to modify cart and proceed to checkout",
        },
        tag: ["@cart", "@checkout"],
      },

      async ({ page, browserName }) => {
        if (browserName != "chromium") {
          test.skip();
        }
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login(credentials.username, credentials.password);

        await homePage.goto();
        await homePage.selectFirstProduct();
        await productPage.addToCart();

        await cartPage.goto();
        await cartPage.increaseQuantity();
        await cartPage.decreaseQuantity();
        await cartPage.checkout();
        await page.pause();

        await expect(page).toHaveTitle(/Cart/, {
          timeout: 5,
        });
      }
    );
  });

  test.describe("User Product @cart", () => {
    test(
      "Product total amount should not exceed 2 decimal places when quantity is 10",
      {
        annotation: {
          type: "basic test",
          description: "Test to validate product total amount",
        },
        tag: ["@cart"],
      },
      async ({ page, browserName }) => {
        if (browserName === "firefox") test.skip();

        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await test.step("Login with valid credentials", async () => {
          await loginPage.goto();
          await loginPage.login(credentials.username, credentials.password);
        });

        await test.step("Add first product to cart", async () => {
          await homePage.goto();
          await homePage.selectFirstProduct();
          await productPage.addToCart();
        });

        await test.step("Navigate to cart", async () => {
          await cartPage.goto();
        });

        for (let i = 1; i < 9; i++) {
          await test.step(`Increase product quantity to ${i + 1}`, async () => {
            await cartPage.increaseQuantity();
            await expect.soft(page).toHaveTitle("koushik", { timeout: 1 });
          });
        }

        await test.step("Validate total amount precision (max 2 decimals)", async () => {
          const amountText = await page
            .locator("table > tbody > tr > td:nth-child(4)")
            .textContent(); // Adjust selector as per your app

          const amountValue = parseFloat(
            amountText?.replace(/[^0-9.]/g, "") || "0"
          );
          const decimalPart = amountValue.toString().split(".")[1] || "";

          expect(decimalPart.length).toBeLessThanOrEqual(2);
        });
      }
    );
  });
});

import { expect, test } from "@playwright/test";

function checkoutPageHtml(): string {
  return `
    <html>
      <body>
        <main>
          <h1>Mock Checkout</h1>
          <button data-testid="product-wireless-headphones">Wireless Headphones</button>
          <button data-testid="add-to-cart">Add to cart</button>
          <span data-testid="cart-badge">0</span>

          <button data-testid="go-to-checkout">Go to checkout</button>
          <input data-testid="shipping-name" placeholder="Name" />
          <input data-testid="shipping-address" placeholder="Address" />

          <button data-testid="proceed-to-payment">Proceed to payment</button>
          <input data-testid="card-number" placeholder="Card Number" />
          <button data-testid="pay-now">Pay now</button>

          <div data-testid="order-confirmation"></div>
        </main>

        <script>
          (function () {
            let cartCount = 0;
            let selectedProduct = "";
            let currentView = "catalog";

            const productBtn = document.querySelector('[data-testid="product-wireless-headphones"]');
            const addToCartBtn = document.querySelector('[data-testid="add-to-cart"]');
            const cartBadge = document.querySelector('[data-testid="cart-badge"]');
            const goToCheckoutBtn = document.querySelector('[data-testid="go-to-checkout"]');
            const proceedBtn = document.querySelector('[data-testid="proceed-to-payment"]');
            const cardInput = document.querySelector('[data-testid="card-number"]');
            const payNowBtn = document.querySelector('[data-testid="pay-now"]');
            const orderConfirmation = document.querySelector('[data-testid="order-confirmation"]');

            productBtn?.addEventListener("click", function () {
              selectedProduct = "Wireless Headphones";
            });

            addToCartBtn?.addEventListener("click", function () {
              if (selectedProduct) {
                cartCount += 1;
                if (cartBadge) {
                  cartBadge.textContent = String(cartCount);
                }
              }
            });

            goToCheckoutBtn?.addEventListener("click", function () {
              currentView = "checkout";
            });

            proceedBtn?.addEventListener("click", function () {
              if (currentView === "checkout") {
                currentView = "payment";
              }
            });

            payNowBtn?.addEventListener("click", function () {
              const card = cardInput && "value" in cardInput ? cardInput.value : "";
              if (orderConfirmation) {
                orderConfirmation.textContent = card === "4000000000000002"
                  ? "Payment declined"
                  : "Order confirmed!";
              }
            });
          })();
        </script>
      </body>
    </html>
  `;
}

test.describe("Checkout flow", () => {
  test("User can complete checkout successfully", async ({ page }) => {
    await test.step("Navigate to google.com", async () => {
      await page.goto("https://www.google.com", {
        waitUntil: "domcontentloaded",
      });
      await page.setContent(checkoutPageHtml());
    });

    await test.step("Add item to cart", async () => {
      await test.step("Click product 'Wireless Headphones'", async () => {
        await page.getByTestId("product-wireless-headphones").click();
      });

      await test.step("Click 'Add to cart' button", async () => {
        await page.getByTestId("add-to-cart").click();
      });

      await test.step("Expect cart badge to show '1'", async () => {
        await expect(page.getByTestId("cart-badge")).toHaveText("1");
      });
    });

    await test.step("Fill shipping details", async () => {
      await test.step("Navigate to checkout page", async () => {
        await page.getByTestId("go-to-checkout").click();
      });

      await test.step("Fill name 'John Doe'", async () => {
        await page.getByTestId("shipping-name").fill("John Doe");
      });

      await test.step("Fill address '123 Main St'", async () => {
        await page.getByTestId("shipping-address").fill("123 Main St");
      });
    });

    await test.step("Complete payment", async () => {
      await test.step("Click 'Proceed to payment'", async () => {
        await page.getByTestId("proceed-to-payment").click();
      });

      await test.step("Fill card number '4111111111111111'", async () => {
        await page.getByTestId("card-number").fill("4111111111111111");
      });

      await test.step("Click 'Pay now'", async () => {
        await page.getByTestId("pay-now").click();
      });

      await test.step("Expect order confirmation to be visible", async () => {
        await expect(page.getByTestId("order-confirmation")).toHaveText(
          "Order confirmed!",
        );
      });
    });
  });

  test.skip("User sees error when payment fails", async ({ page }) => {
    await test.step("Navigate to google.com", async () => {
      await page.goto("https://www.google.com", {
        waitUntil: "domcontentloaded",
      });
      await page.setContent(checkoutPageHtml());
    });

    await test.step("Add item to cart", async () => {
      await test.step("Click product 'Wireless Headphones'", async () => {
        await page.getByTestId("product-wireless-headphones").click();
      });

      await test.step("Click 'Add to cart' button", async () => {
        await page.getByTestId("add-to-cart").click();
      });
    });

    await test.step("Fill shipping details", async () => {
      await test.step("Navigate to checkout page", async () => {
        await page.getByTestId("go-to-checkout").click();
      });

      await test.step("Fill name 'Jane Smith'", async () => {
        await page.getByTestId("shipping-name").fill("Jane Smith");
      });
    });

    await test.step("Attempt payment with declined card", async () => {
      await test.step("Click 'Proceed to payment'", async () => {
        await page.getByTestId("proceed-to-payment").click();
      });

      await test.step("Fill card number '4000000000000002' (declined)", async () => {
        await page.getByTestId("card-number").fill("4000000000000002");
      });

      await test.step("Click 'Pay now'", async () => {
        await page.getByTestId("pay-now").click();
      });

      await test.step("Expect order confirmation text to be 'Order confirmed!'", async () => {
        await expect(page.getByTestId("order-confirmation")).toHaveText(
          "Order confirmed!",
        );
      });
    });
  });
});

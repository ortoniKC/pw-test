import { Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.locator('app-cartvalue').getByRole('button').first().click();
    }

    async increaseQuantity() {
        await this.page.getByRole('button', { name: '+' }).click();
    }

    async decreaseQuantity() {
        await this.page.getByRole('button', { name: '-' }).click();
    }

    async checkout() {
        await this.page.getByRole('button', { name: 'Checkout' }).click();
    }
}

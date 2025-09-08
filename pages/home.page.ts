import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/home');
    }

    async selectFirstProduct() {
        await this.page.getByRole('heading', { name: 'Fake Store' }).click(); // Ensure you're on home
        const products = this.page.locator('.card').first();
        await products.getByRole('button').click();
    }
}

import { Page } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) { }

    async addToCart() {
        await this.page.getByRole('button', { name: 'Add to Cart' }).click();
    }
}

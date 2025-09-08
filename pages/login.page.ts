import { expect, Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
        await this.page.getByPlaceholder('Enter Username').fill(username);
        await this.page.getByPlaceholder('Enter Password').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        await expect(this.page.locator("//i[@class='fas fa-sign-out-alt']")).toBeVisible({ timeout: 5000 });
    }
}

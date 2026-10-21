
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[name="login-email"]');
    this.passwordInput = page.locator('[name="login-password"]');
    this.loginButton = page.getByRole('button', {
      name: 'Log in',
    });
  }

  async open() {
    await this.page.goto('/apps/lms');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    await expect(this.page).toHaveURL(/\/apps\/lms\/courses/);
  }
}


import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.describe('Negative login tests', () => {
  test('Rejects invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.emailInput.fill('wrong@learnhub.dev');
    await loginPage.passwordInput.fill('WrongPass123');
    await loginPage.loginButton.click();

    await expect(page).not.toHaveURL(/\/apps\/lms\/courses/);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

 
test('Prevents login with empty fields', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.loginButton.click();

  // Empty credentials must not allow access to courses.
  await expect(page).not.toHaveURL(/\/apps\/lms\/courses/);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
});

});

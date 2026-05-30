import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';

test.describe('OrangeHRM Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should show login form elements', async () => {
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should display demo credentials hint', async () => {
    await expect(loginPage.demoUsername).toBeVisible();
    await expect(loginPage.demoPassword).toBeVisible();
  });

  test('should display forgot password help text', async () => {
    await expect(loginPage.forgotPassword).toBeVisible();
    await expect(loginPage.forgotPassword).toHaveText('Forgot your password?');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('Admin', 'admin123', true);
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });

  test('should show error for blank username and blank password', async ({ page }) => {
    await loginPage.fillCredentials('', '');
    await loginPage.submit();
    await expect(loginPage.requiredErrors).toHaveCount(2);
    await expect(page).toHaveURL(loginPage.url);
  });

  test('should show error for blank username and valid password', async ({ page }) => {
    await loginPage.fillCredentials('', 'admin123');
    await loginPage.submit();
    await expect(loginPage.requiredErrors).toHaveCount(1);
    await expect(page).toHaveURL(loginPage.url);
  });

  test('should show error for valid username and blank password', async ({ page }) => {
    await loginPage.fillCredentials('Admin', '');
    await loginPage.submit();
    await expect(loginPage.requiredErrors).toHaveCount(1);
    await expect(page).toHaveURL(loginPage.url);
  });

  test('should show error for valid username and incorrect password', async ({ page }) => {
    await loginPage.fillCredentials('Admin', 'wrongpass');
    await loginPage.submit();
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should show error for incorrect username and valid password', async ({ page }) => {
    await loginPage.fillCredentials('wronguser', 'admin123');
    await loginPage.submit();
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should reject SQL injection-like input', async ({ page }) => {
    await loginPage.fillCredentials("' OR '1'='1", "' OR '1'='1");
    await loginPage.submit();
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should handle long username and password strings safely', async ({ page }) => {
    const longText = 'a'.repeat(256);
    await loginPage.fillCredentials(longText, longText);
    await loginPage.submit();
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should reject special characters in username and password', async ({ page }) => {
    await loginPage.fillCredentials('!@#$%^&*()', '!@#$%^&*()');
    await loginPage.submit();
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });
});

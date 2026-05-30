import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  private readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly heading: Locator;
  readonly demoUsername: Locator;
  readonly demoPassword: Locator;
  readonly forgotPassword: Locator;
  readonly requiredErrors: Locator;
  readonly invalidCredentialsError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.demoUsername = page.locator('text=Username : Admin');
    this.demoPassword = page.locator('text=Password : admin123');
    this.forgotPassword = page.locator('.orangehrm-login-forgot');
    this.requiredErrors = page.locator('.oxd-input-field-error-message');
    this.invalidCredentialsError = page.getByText('Invalid credentials');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit(noWaitAfter = true): Promise<void> {
    await this.loginButton.click({ noWaitAfter });
  }

  async login(username: string, password: string, waitForDashboard = false): Promise<void> {
    await this.fillCredentials(username, password);

    if (waitForDashboard) {
      await Promise.all([
        this.page.waitForURL(/dashboard/),
        this.loginButton.click(),
      ]);
      return;
    }

    await this.submit();
  }

}

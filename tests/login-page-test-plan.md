# OrangeHRM Login Page Test Plan

## Application Overview

Comprehensive test plan for the OrangeHRM login page at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login, including positive, negative, validation, and UI behavior cases.

## Test Scenarios

### 1. OrangeHRM Login Page

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Navigate to the OrangeHRM login page at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
  2. Enter the valid username Admin into the username field.
    - expect: The username field accepts input.
  3. Enter the valid password admin123 into the password field.
    - expect: The password field accepts input.
  4. Click the Login button.
    - expect: The application redirects to the authenticated dashboard or landing page.
    - expect: Login is successful and no error message appears.

#### 1.2. Login attempt with blank username and blank password

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Leave the username field blank.
    - expect: The username field remains empty.
  3. Leave the password field blank.
    - expect: The password field remains empty.
  4. Click the Login button.
    - expect: The page stays on the login screen.
    - expect: An error message is shown: Invalid credentials.

#### 1.3. Login attempt with blank username and valid password

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Leave the username field blank.
    - expect: The username field remains empty.
  3. Enter admin123 into the password field.
    - expect: The password field accepts input.
  4. Click the Login button.
    - expect: The page stays on the login screen.
    - expect: An error message is shown: Invalid credentials.

#### 1.4. Login attempt with valid username and blank password

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Enter Admin into the username field.
    - expect: The username field accepts input.
  3. Leave the password field blank.
    - expect: The password field remains empty.
  4. Click the Login button.
    - expect: The page stays on the login screen.
    - expect: An error message is shown: Invalid credentials.

#### 1.5. Login attempt with valid username and incorrect password

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Enter Admin into the username field.
    - expect: The username field accepts input.
  3. Enter an incorrect password such as wrongpass into the password field.
    - expect: The password field accepts input.
  4. Click the Login button.
    - expect: The page stays on the login screen.
    - expect: An error message is shown: Invalid credentials.

#### 1.6. Login attempt with incorrect username and valid password

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Enter an incorrect username such as wronguser into the username field.
    - expect: The username field accepts input.
  3. Enter admin123 into the password field.
    - expect: The password field accepts input.
  4. Click the Login button.
    - expect: The page stays on the login screen.
    - expect: An error message is shown: Invalid credentials.

#### 1.7. Login attempt using SQL injection-like input

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Enter a SQL injection string such as "' OR '1'='1" into the username field.
    - expect: The username field accepts the value.
  3. Enter a SQL injection string such as "' OR '1'='1" into the password field.
    - expect: The password field accepts the value.
  4. Click the Login button.
    - expect: The page stays on the login screen.
    - expect: An error message is shown and the page does not execute unauthorized login behavior.

#### 1.8. Login attempt with long username and password strings

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Enter a very long string (e.g. 256 characters) into the username field.
    - expect: The username field accepts input without UI breakage.
  3. Enter a very long string (e.g. 256 characters) into the password field.
    - expect: The password field accepts input without UI breakage.
  4. Click the Login button.
    - expect: The page stays on the login screen or safely rejects input.
    - expect: No unexpected JavaScript or server errors occur.

#### 1.9. Login attempt with special characters in username and password

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Enter special characters such as !@#$%^&*() into the username field.
    - expect: The username field accepts the value.
  3. Enter special characters such as !@#$%^&*() into the password field.
    - expect: The password field accepts the value.
  4. Click the Login button.
    - expect: The page stays on the login screen.
    - expect: An error message is shown: Invalid credentials.

#### 1.10. Verify login page UI elements and labels

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Inspect the page for the Username label, Password label, username placeholder, password placeholder, and Login button.
    - expect: The Username label is visible.
    - expect: The Password label is visible.
    - expect: The username placeholder reads Username.
    - expect: The password placeholder reads Password.
    - expect: The Login button is visible and labeled Login.

#### 1.11. Verify demo credentials hint text is visible

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Locate the demo credentials hint area on the page.
    - expect: Text showing "Username : Admin" and "Password : admin123" is visible.

#### 1.12. Verify Forgot your password? link is present

**File:** `tests/login-page-test-plan.md`

**Steps:**
  1. -
    - expect: Start on the OrangeHRM login page.
  2. Locate the "Forgot your password?" text or link.
    - expect: The Forgot your password? element is visible.
  3. Click the Forgot your password? element.
    - expect: The browser navigates to the password recovery page or shows password reset instructions.

# Automation Folder

This directory contains various Playwright-based automation scripts and helpers for testing different functionalities, including login, rewards, and shop-related workflows. The tests are implemented in TypeScript and utilize reusable helper functions for improved maintainability.

## Folder Structure

- **helpers/**
  - **helpers.ts**: Contains reusable helper functions for actions such as opening menus, logging in, and navigating to different pages.
- **pages/**
  - **accountPage.ts**: Handles actions related to the account page.
  - **loginModal.ts**: Handles user login and authentication.
  - **shopPage.ts**: Handles actions related to the shop page.
- **tests/**
  - **buy_reward.spec.ts**: Contains tests for purchasing rewards and verifying the balance.
  - **login.spec.ts**: Contains tests for logging in the user.
  - **set_wager_limit.spec.ts**: Contains tests for setting and verifying wager limits.
- **config.json**: Configuration file for test data, such as login credentials.
- **playwright.config.ts**: Playwright configuration file.
- **runTests.ts**: Entry point for running the tests.
- **tsconfig.json**: TypeScript configuration file.
- **README.md**: This file.

---

## Helpers

### openMenu(page: Page)
A reusable function to open the main navigation menu.

### login(page: Page, loginModal: LoginPage)
Logs in the user by navigating to the login page, performing login, and verifying the success message.

### goToRewardsPage(page: Page)
Navigates to the rewards page and verifies the visibility of the rewards page header.

### goToShopPage(page: Page, shopPage: ShopPage)
Opens the main navigation menu and navigates to the shop page.

### GoToMyAccount(page: Page)
Navigates to the "My Account" section of the application.

### randomWait(min: number, max: number)
Waits for a random amount of time between the specified `min` and `max` values (in milliseconds).

---

## Page Objects

### AccountPage
This page object handles actions related to the account page, including managing wager limits.

#### Methods:
- **goToResponsibleGaming()**: Navigates to the responsible gaming page.
- **clickSetLimit()**: Clicks on the option to set a wager limit.
- **openWagerLimitDropdown()**: Opens the dropdown for selecting a wager limit.
- **selectWagerOption()**: Selects a wager option from the dropdown.
- **setWagerLimit(amount: number, type: 'daily' | 'weekly' | 'monthly')**: Sets a wager limit for the user.
- **confirmWagerLimit()**: Confirms the wager limit is set and waits for the success notification.
- **extractCurrentLimits()**: Extracts the current wager limits.
- **verifyUpdatedLimits(expectedLimits: { daily: number, weekly: number, monthly: number })**: Verifies if the wager limits are updated correctly.

### LoginPage
This page object handles user login and authentication.

#### Methods:
- **navigate()**: Navigates to the base URL and accepts cookies.
- **login()**: Logs in the user using credentials from the config file.
- **validateLoginSuccess()**: Validates that the login was successful by checking for the "Welcome back" message.

### ShopPage
This page object handles actions related to the shop page, such as buying rewards and verifying the user's balance.

#### Methods:
- **openMenu()**: Opens the main navigation menu.
- **goToShop()**: Navigates to the shop page.
- **waitForBalance(timeout = 5000)**: Waits for the user's balance to exceed a certain amount.
- **waitForShopItems()**: Waits for shop items to be visible.
- **buyReward()**: Clicks the "Buy" button to purchase a reward.
- **validateBuyModal()**: Validates the balance after purchasing a reward.
- **confirmPurchase()**: Confirms the purchase of a reward and verifies the success notification.
- **getRewardCount()**: Retrieves the current count of rewards.
- **goToRewardsPage()**: Navigates to the rewards page.

---

## Test Scripts

### Login Test Flow (`login.spec.ts`)
- Logs in the user using valid credentials.
- Validates that the user is successfully logged in by checking the "Welcome back" message.

### Buy Reward Flow (`buy_reward.spec.ts`)
- Logs in the user.
- Navigates to the shop.
- Purchases a reward.
- Verifies the balance after the purchase and validates the reward count.

### Set Wager Limit Flow (`set_wager_limit.spec.ts`)
- Logs in the user.
- Navigates to the "My Account" page.
- Sets and verifies wager limits (daily, weekly, monthly).

---

## Installation and Setup

To run the automation tests, you need to have Node.js installed. Follow these steps:

1. Clone the repository.
2. Navigate to the **Automation** folder:

   ```bash
   cd Automation
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. To run the tests, execute the following command::

   ```bash
   npx ts-node runTests.ts
   ```

## Reporting
Test results will automatically be shown after running the tests in a web page.

## Error Handling
When running the automation tests, it is important to understand how errors are handled and how to interpret them. Below are some key aspects of error handling:

1. Test Failures and Assertions
Each test contains assertions that validate the correctness of the actions taken. If an assertion fails, Playwright will log the error message indicating what went wrong.

For example, if the login fails, the validateLoginSuccess() method will throw an error indicating that the "Welcome back" message was not found. The test will be marked as failed, and the specific failure message will be displayed in the console.

2. Error Messages
Playwright automatically provides descriptive error messages, including details on the action that caused the failure and any relevant information (e.g., a screenshot or page source can be captured if the headless mode is disabled).

Error messages from failing tests will be displayed in the console and are formatted to make it easier to pinpoint the exact issue.

3. Screenshots and Videos

To aid debugging, Playwright can capture screenshots and videos when a test fails. These media files provide valuable context for reproducing and identifying the problem.

* Screenshots can be enabled in the Playwright configuration by setting up the screenshot option (On by defualt):
```bash
projects: [
  {
    name: 'firefox',
    use: { screenshot: 'only-on-failure' },
  },
]

```
* You can also set Playwright to record a video of the entire test run by adding the following configuration:

```bash
projects: [
  {
    name: 'chrome',
    use: { video: 'on-first-retry' },
  },
]
```
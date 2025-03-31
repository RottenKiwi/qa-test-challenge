# GiG QAE Challenge

This repository contains the solution for the GiG QAE Challenge, consisting of two main tasks: exploratory testing and end-to-end (e2e) test automation. The goal of this challenge is to demonstrate testing skills and showcase best practices in exploratory testing and automation.

## Overview

### Project Structure
The project is organized into two main folders: 
- **`automation/`**: Contains all the automated test scripts for end-to-end testing.
- **`exploratory-testing/`**: Contains findings from the exploratory testing task.



### automation/

- **README.md**: Documentation specific to the automation setup and how to run the tests.
- **config.json**: Configuration file for test data, such as login credentials.
- **helpers/**: Folder for reusable helper functions that simplify automation tasks.
  - **helpers.ts**: Contains reusable helper functions for actions such as opening menus, logging in, and navigating to different pages.
- **package.json**: Node.js dependencies and scripts related to automation.
- **pages/**: Folder containing Page Object Model (POM) files for different pages in the application.
  - **accountPage.ts**: Handles actions related to the account page.
  - **loginModal.ts**: Handles user login and authentication.
  - **shopPage.ts**: Handles actions on the shop page.
- **playwright.config.ts**: Playwright configuration file, setting up the test environment and browser options.
- **runTests.ts**: Entry point for executing the Playwright tests.
- **tests/**: Folder for test scripts that test different features of the application.
  - **buy_reward.spec.ts**: Test script for buying a reward and verifying balance.
  - **login.spec.ts**: Test script for verifying the login functionality.
  - **set_wager_limit.spec.ts**: Test script for setting and verifying wager limits.
- **tsconfig.json**: TypeScript configuration file, specifying compiler options for the project.

### exploratory-testing/

- **README.md**: Documentation for exploratory testing, explaining the testing approach, tools used, and structure of findings.
- **findings.md**: Detailed insights and observations from exploratory testing of the promotions section, including bugs, inconsistencies, and suggestions for improvement.

---

## Task 1: Exploratory Testing

**Objective**: Explore the **/promotions** page and a specific **promotion page** (`/promotions/230301_mar23_ca_to_rfs`) as a logged-out user.

### Exploration Focus:
- **Promotions Page** (`/promotions`): Explore the main promotions section.
- **Promotion Details** (`/promotions/230301_mar23_ca_to_rfs`): Explore a specific promotion for details.

### Key Scenarios to Report:
1. **Promotions Section**: Describe 2 key scenarios for the promotions section.
2. **Promotion Page**: Describe 2 key scenarios for the specific promotion page.

### Report Format:
- Include evidence such as screenshots and notes where applicable.
- Focus on user experience from a visitor's perspective.

---

## Task 2: Test Automation (End-to-End Testing)

**Objective**: Automate tests for different functionalities of the application, with at least one test from each of the selected scenarios.

### Test Scenarios:
1. **Buy a reward**: Automate the process of purchasing a reward from the shop as a logged-in user.
2. **Set a wager limit**: Automate setting a wager limit from the account section via the responsible gaming subsection.

### Automation Tools and Frameworks:
- **Playwright**: Used for browser automation.
- **TypeScript**: Language for writing automation scripts.
- **Page Object Model (POM)**: Organized structure to maintain reusable code.

### Code Organization:
- **Page Objects**: Defined for each major page (`accountPage.ts`, `loginModal.ts`, `shopPage.ts`) to handle element selectors and actions.
- **Helper Functions**: Used in the `helpers.ts` file to store reusable functions across tests.
- **Test Scripts**: Located in the `tests/` folder with test files for each functionality (e.g., `buy_reward.spec.ts`, `login.spec.ts`, `set_wager_limit.spec.ts`).
- **Run Tests**: `runTests.ts` to trigger the execution of all tests.

### Setup Instructions:
1. Clone the repository.
2. Navigate to the **`automation`** folder:
   ```bash
   cd automation
   ```
2. Install dependecies:
   ```bash
   npm install 
   ```
3. Run tests:
   ```bash
   npx ts-node runTests.ts 
   ```

## Additional Features:

* Code Reusability: Tests and code are designed to be extensible and reusable.

* Test Data: You may add more tests with data-driven approaches.

* Visual Reports: Ensure visual reports of the tests can be generated.

* Cross-Browser Testing: Support for multiple browsers and viewports.

## To add:

* Docker Setup: Set up a Docker container to run a local server where you can select tests and browsers instead of using the CLI.
* BDD Updates: The project can be easily updated with BDD for clearer and more maintainable test scenarios.
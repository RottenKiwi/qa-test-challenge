import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginModal';

test('User can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login();

    // Validate login success by checking the "Welcome back" message
    await loginPage.validateLoginSuccess();
});

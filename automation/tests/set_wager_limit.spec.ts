import { test } from '@playwright/test';
import { login } from '../helpers/helpers';
import { LoginPage } from '../pages/loginModal';
import { AccountPage } from '../pages/accountPage';

test('Set wager limits (Daily, Weekly, Monthly)', async ({ page }) => {
    const loginModal = new LoginPage(page);
    const accountPage = new AccountPage(page);

    // Step 1: Login
    await login(page, loginModal);

    // Step 2: Navigate to Responsible Gaming and Extract current limits
    await accountPage.goToResponsibleGaming();
    const newLimits = await accountPage.extractCurrentLimits();

    // Step 3: Set Daily, Weekly, and Monthly Limits
    for (const [type, amount] of Object.entries(newLimits)) {
        await accountPage.clickSetLimit();
        await accountPage.openWagerLimitDropdown();
        await accountPage.selectWagerOption();
        await accountPage.setWagerLimit(amount, type as 'daily' | 'weekly' | 'monthly');
        await accountPage.confirmWagerLimit();
    }

    // Step 4: Verify the new wager limits
    await accountPage.verifyUpdatedLimits(newLimits);

});

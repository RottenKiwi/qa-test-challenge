import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginModal'; // Adjust path if needed
import { ShopPage } from '../pages/shopPage'; // Import ShopPage if needed

// Reusable function to open the menu
export async function openMenu(page: Page) {
    const menuButton = page.locator('[data-v-test-id="top-nav-menu"]');
    await menuButton.click();
}

// Reusable function to login
export async function login(page: Page, loginModal: LoginPage) {
    await loginModal.navigate();
    await loginModal.login();
    await loginModal.validateLoginSuccess();
}

// Reusable function to go to the rewards page
export async function goToRewardsPage(page: Page) {
    const rewardsLinks = page.locator('a[href="/en/rewards"]');
    await rewardsLinks.first().click();
    const rewardsPageHeader = page.locator('h3.text >> text=Rewards');
    await rewardsPageHeader.waitFor({ state: 'visible', timeout: 10000 });
}

// Reusable function to go to the shop
export async function goToShop(page: Page, shopPage: ShopPage) {
    await openMenu(page); // Open the menu first
    await shopPage.goToShop(); // Navigate to the shop
}

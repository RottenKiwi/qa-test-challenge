import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginModal';
import { ShopPage } from '../pages/shopPage';

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
export async function goToShopPage(page: Page, shopPage: ShopPage) {
    await openMenu(page);
    await shopPage.goToShop();
}

// Reusable function to navigate to "My Account"
export async function GoToMyAccount(page: Page) {


    // Open "My Account" accordion
    const myAccountAccordion = page.locator('[data-v-test-id="main-navigation-accordion"]');
    await myAccountAccordion.click();

    // Click on "My Account" link
    const myAccountLink = page.locator('[data-v-test-id="my account"]');
    await myAccountLink.click();
}

export async function randomWait(min: number = 500, max: number = 1500) {
    const waitTime = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise(resolve => setTimeout(resolve, waitTime));
}

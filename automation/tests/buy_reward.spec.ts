import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginModal'; // Import LoginModal class
import { ShopPage } from '../pages/shopPage'; // Import ShopPage class
import configData from '../config.json';

test('User can buy a reward from the shop after logging in', async ({ page }) => {
    const loginModal = new LoginPage(page);
    const shopPage = new ShopPage(page);

    // Step 1: Navigate to the page and log in
    await loginModal.navigate();
    await loginModal.login();

    // Step 2: Validate login by checking for the welcome message
    await loginModal.validateLoginSuccess();

    // Step 3: Navigate to the rewards page to check the current rewards
    await shopPage.goToRewardsPage(); // Go to the rewards page

    // Step 4: Fetch and log the number of rewards
    const rewardCountBefore = await shopPage.getRewardCount();
    console.log(`Rewards count before purchase: ${rewardCountBefore}`);

    // Step 5: Open the menu again and navigate to the shop
    await shopPage.openMenu(); // Open the menu
    await shopPage.goToShop(); // Go to the shop

    // Step 6: Wait for the balance to be visible and greater than 1
    await shopPage.waitForBalance();

    // Step 7: Wait for the shop items to appear
    await shopPage.waitForShopItems();

    // Step 8: Add the reward to the cart and click the "buy" button
    await shopPage.buyReward();

    await shopPage.validateBuyModal();

    await shopPage.confirmPurchase();

    // Step 9: Optionally, verify the updated reward count after the purchase
    await shopPage.goToRewardsPage(); // Go back to the rewards page
    const rewardCountAfter = await shopPage.getRewardCount();
    console.log(`Rewards count after purchase: ${rewardCountAfter}`);

    // Step 10: Ensure that the reward count has increased by 1
    expect(rewardCountAfter).toBe(rewardCountBefore + 1);


});

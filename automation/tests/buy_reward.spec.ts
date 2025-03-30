import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shopPage';
import { LoginPage } from '../pages/loginModal';
import * as helper from '../helpers/helpers'; // Import all helpers

test('User can buy a reward from the shop after logging in', async ({ page }) => {
    const loginModal = new LoginPage(page);
    const shopPage = new ShopPage(page);

    // Step 1: Login using the helper function
    await helper.login(page, loginModal);

    // Step 2: Navigate to the rewards page using the helper function
    await helper.goToRewardsPage(page);

    // Step 3: Fetch and log the number of rewards before purchase
    const rewardCountBefore = await shopPage.getRewardCount();
    console.log(`Rewards count before purchase: ${rewardCountBefore}`);

    // Step 4: Go to the shop using the helper function
    await helper.goToShop(page, shopPage);

    // Step 5: Wait for the balance to be visible and greater than 1
    await shopPage.waitForBalance();

    // Step 6: Wait for the shop items to appear
    await shopPage.waitForShopItems();

    // Step 7: Add the reward to the cart and click the "buy" button
    await shopPage.buyReward();

    // Step 8: Validate the buy modal
    await shopPage.validateBuyModal();

    // Step 9: Confirm the purchase
    await shopPage.confirmPurchase();

    // Step 10: Verify the updated reward count after the purchase
    await helper.goToRewardsPage(page);
    const rewardCountAfter = await shopPage.getRewardCount();
    console.log(`Rewards count after purchase: ${rewardCountAfter}`);

    // Step 11: Ensure that the reward count has increased by 1
    expect(rewardCountAfter).toBe(rewardCountBefore + 1);
});

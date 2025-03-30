import { Page, expect } from '@playwright/test';


export class ShopPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Click the menu to open the navigation menu
    async openMenu() {
        await this.page.click('[data-v-test-id="top-nav-menu"]');
    }

    // Click the "Shop" link to navigate to the shop
    async goToShop() {
        // Locate the shop icon directly using its name attribute
        const shopIcon = this.page.locator('magic-ui-icon[name="shop"]');

        // Wait for the shop icon to be visible before clicking
        await shopIcon.waitFor({ state: 'visible' });

        // Scroll the shop icon into view if it's not visible in the viewport
        await shopIcon.scrollIntoViewIfNeeded();

        // Click on the shop icon
        await shopIcon.click({ force: true });
    }

    // Wait for the balance to be visible and check if it is greater than 1
    async waitForBalance(timeout = 5000) {
        const balanceLocator = this.page.locator('[data-v-ce8d737c][part="balance"]');
        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            const balanceText = await balanceLocator.textContent();
            const balance = parseInt(balanceText?.trim() || '0', 10);

            // If balance is greater than 1, return
            if (balance > 1) {
                return;
            }

            // Wait a little before checking again
            await this.page.waitForTimeout(500); // Adjust this delay as needed
        }

        // If the timeout is reached and balance is still <= 1, throw an error
        throw new Error('Balance did not exceed 1 within the timeout period.');
    }

    async waitForShopItems() {
        // Get all elements matching the locator
        const rewardMessages = this.page.locator('h1.text--ellipsis');

        // Wait until at least one appears
        await rewardMessages.first().waitFor({ state: 'visible' });

        // Find the first reward message with the correct text
        const count = await rewardMessages.count();
        for (let i = 0; i < count; i++) {
            const text = await rewardMessages.nth(i).textContent();
            if (text?.trim() === "Reward Message") {
                await rewardMessages.nth(i).waitFor({ state: 'visible' });
                return;
            }
        }

        throw new Error('Reward Message not found');
    }


    async buyReward() {
        // Get all Buy buttons
        const buyButtons = this.page.locator('[data-v-test-id="shop-item-buy"]');

        // Wait for at least one button to appear
        await buyButtons.first().waitFor({ state: 'visible' });

        // Click the first available Buy button
        await buyButtons.first().click();
    }

    async validateBuyModal() {
        // Get all balance elements
        const balanceElements = this.page.locator('p.text--inherit-weight');
        const balanceCount = await balanceElements.count();

        // Extract the first balance element (User's current balance)
        if (balanceCount > 0) {
            const balanceText = await balanceElements.first().innerText();
            var currentBalance = parseInt(balanceText, 10);
        } else {
            throw new Error("No balance elements found.");
        }

        // Extract the reward price (Element index 3 based on debug output)
        if (balanceCount > 3) {
            const priceText = await balanceElements.nth(3).innerText();
            var rewardPrice = parseInt(priceText, 10);
        } else {
            throw new Error("Reward price element not found.");
        }

        // Extract the expected balance after purchase (Element index 4)
        if (balanceCount > 4) {
            const afterBalanceText = await balanceElements.nth(4).innerText();
            var expectedBalance = parseInt(afterBalanceText, 10);
        } else {
            throw new Error("Expected balance element not found.");
        }

        console.log(`Current Balance: ${currentBalance}`);
        console.log(`Reward Price: ${rewardPrice}`);
        console.log(`Expected Balance: ${expectedBalance}`);

        // Validate the balance calculation
        if (currentBalance - rewardPrice !== expectedBalance) {
            throw new Error(
                `Balance calculation mismatch: Expected ${currentBalance - rewardPrice}, but got ${expectedBalance}`
            );
        }
    }
    async confirmPurchase() {
        // Locate the button using a more reliable selector
        const buyButton = this.page.locator('magic-ui-button[data-v-test-id="shop-details-later-button"] >> text=Buy');

        // Wait for the button to be visible
        await buyButton.waitFor({ state: 'visible', timeout: 10000 });

        // Log the button's visibility (for debugging)
        const isVisible = await buyButton.isVisible();

        // Try clicking the button if it's visible
        if (isVisible) {
            await buyButton.click();

            // Wait for the notification popup to appear
            const notificationPopup = this.page.locator('[data-v-test-id="notification-text"]');
            await notificationPopup.waitFor({ state: 'visible', timeout: 10000 });

            // Verify the notification text content
            const notificationText = await notificationPopup.textContent();
            expect(notificationText).toContain('Your reward has been added to your reward section');
            expect(notificationText).toContain('Click here');
        } else {
            console.error('Buy button is not visible!');
        }
    }

    // Get the current reward count from the rewards page
    async getRewardCount() {
        const rewardBadge = this.page.locator('[data-v-test-id="rewards-category-badge"]');
        const badgeText = await rewardBadge.textContent();
        const rewardCount = parseInt(badgeText?.trim() || '0', 10);
        return rewardCount;
    }


    async goToRewardsPage() {
        // Locate all links that point to the rewards page
        const rewardsLinks = this.page.locator('a[href="/en/rewards"]');

        // Click the first one
        await rewardsLinks.first().click();

        // Wait for the Rewards heading to appear
        const rewardsPageHeader = this.page.locator('h3.text >> text=Rewards');
        await rewardsPageHeader.waitFor({ state: 'visible', timeout: 10000 });
    }


}

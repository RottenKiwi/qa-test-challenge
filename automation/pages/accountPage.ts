import { Page } from '@playwright/test';
import { randomWait } from '../helpers/helpers';

export class AccountPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToResponsibleGaming() {
        await this.page.locator('a[href="/en/account/responsible-gaming/view-limits"]').click();
    }

    async clickSetLimit() {
        await this.page.locator('a[href="/en/account/responsible-gaming/create-limits"]').click();
    }

    async openWagerLimitDropdown() {
        await this.page.locator('[data-v-test-id="create-limits-dropdown"]').click();
    }

    async selectWagerOption() {
        await randomWait(500, 1500);
        await this.page.locator('form').getByRole('combobox').selectOption({ value: '7' });
    }

    private async selectWagerLimitType(type: 'week' | 'month') {
        const radioButton = this.page.locator(`input[type="radio"][id="${type}"]`);
        await randomWait(500, 1500);
        await radioButton.scrollIntoViewIfNeeded();
        await radioButton.waitFor({ state: 'visible' });
        await radioButton.click();
    }

    async setWagerLimit(amount: number, type: 'daily' | 'weekly' | 'monthly') {
        console.log(`Setting ${type} wager limit: £${amount}...`);

        if (type === 'weekly') {
            await this.selectWagerLimitType('week');
        } else if (type === 'monthly') {
            await this.selectWagerLimitType('month');
        }

        const wagerInput = this.page.locator('input[type="number"][placeholder="Amount"]');
        await randomWait(500, 1500);
        await wagerInput.scrollIntoViewIfNeeded();
        await wagerInput.waitFor({ state: 'visible' });
        await wagerInput.fill(amount.toString());
    }

    async confirmWagerLimit() {
        const setLimitButton = this.page.locator('[data-v-test-id="create-limits-set-limit"]');
        await setLimitButton.scrollIntoViewIfNeeded();
        await setLimitButton.waitFor({ state: 'visible' });
        await setLimitButton.click();

        await randomWait(2000, 2500);
        await this.page.locator('p', { hasText: 'Your limit has been set' }).first().waitFor({ state: 'visible', timeout: 5000 });

        console.log('✅ Wager limit successfully set.');
    }

    async extractCurrentLimits() {
        await this.page.locator('[data-v-test-id="enhanced-limit-type-accordion-10"]').click();
        const wagerLimitElements = this.page.locator('[data-v-test-id="enhanced-limit-card-amount"]');

        const count = await wagerLimitElements.count();
        const limits = { daily: 0, weekly: 0, monthly: 0 };

        if (count > 6) {
            limits.daily = parseFloat((await wagerLimitElements.nth(2).innerText()).replace('Amount £', '').trim());
            limits.weekly = parseFloat((await wagerLimitElements.nth(4).innerText()).replace('Amount £', '').trim());
            limits.monthly = parseFloat((await wagerLimitElements.nth(6).innerText()).replace('Amount £', '').trim());
        }

        console.log(`📊 Extracted Limits: Daily: £${limits.daily}, Weekly: £${limits.weekly}, Monthly: £${limits.monthly}`);

        return {
            daily: limits.daily + 2,
            weekly: limits.weekly + 2,
            monthly: limits.monthly + 2
        };
    }

    async verifyUpdatedLimits(expectedLimits: { daily: number, weekly: number, monthly: number }) {
        await randomWait(3000, 3500);
        await this.page.locator('[data-v-test-id="enhanced-limit-type-accordion-10"]').click();
        const wagerLimitElements = this.page.locator('[data-v-test-id="enhanced-limit-card-amount"]');
        const count = await wagerLimitElements.count();

        const actualLimits = { daily: 0, weekly: 0, monthly: 0 };

        if (count > 6) {
            actualLimits.daily = parseFloat((await wagerLimitElements.nth(2).innerText()).replace('Amount £', '').trim());
            actualLimits.weekly = parseFloat((await wagerLimitElements.nth(4).innerText()).replace('Amount £', '').trim());
            actualLimits.monthly = parseFloat((await wagerLimitElements.nth(6).innerText()).replace('Amount £', '').trim());
        }

        console.log(`✅ Updated Limits: Daily: £${actualLimits.daily}, Weekly: £${actualLimits.weekly}, Monthly: £${actualLimits.monthly}`);

        if (
            actualLimits.daily === expectedLimits.daily &&
            actualLimits.weekly === expectedLimits.weekly &&
            actualLimits.monthly === expectedLimits.monthly
        ) {
            console.log('✅ Limits updated successfully.');
        } else {
            console.error(`❌ Incorrect limits! Expected: ${JSON.stringify(expectedLimits)} Got: ${JSON.stringify(actualLimits)}`);
            throw new Error('Wager limits verification failed.');
        }
    }
}

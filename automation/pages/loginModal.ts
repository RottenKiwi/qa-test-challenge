import { Page } from '@playwright/test';
import configData from '../config.json';

export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to the base URL and handle authentication
    async navigate() {
        // Set authentication credentials before visiting the page
        await this.page.context().setHTTPCredentials({
            username: configData.authCredentials.username,
            password: configData.authCredentials.password
        });

        await this.page.goto(configData.baseUrl, { waitUntil: "load" });

        // Wait for the cookies consent pop-up to be visible
        const cookieButton = await this.page.locator('magic-ui-button.cookie-button');
        await cookieButton.waitFor({ state: 'visible' });

        // Scroll the cookie button into view if needed
        await cookieButton.scrollIntoViewIfNeeded();

        // Click the "OK" button to accept cookies
        await cookieButton.click({ force: true });
    }

    // Perform actual login using the user credentials
    async login() {
        // Click the login button using the correct selector for the magic-ui-button
        await this.page.click('[data-v-test-id="top-nav-login"]', { force: true });

        // Wait for the login modal to appear (wait for the username input field)
        await this.page.waitForSelector('#email', { state: 'visible' });

        // Fill the username and password fields for actual login
        await this.page.fill('#email', configData.userCredentials.username);
        await this.page.fill('[name="password"]', configData.userCredentials.password);

        // Click the "Login" button to submit the form
        await this.page.click('[data-v-test-id="login-form-submit"]', { force: true });
    }

    // Validate successful login by checking the "Welcome back" message
    async validateLoginSuccess() {
        // Wait for the notification text to appear and validate part of the message
        const notificationText = await this.page.locator('[data-v-test-id="notification-text"]');
        await notificationText.waitFor({ state: 'visible' });

        // Validate that the message contains "Welcome back"
        const textContent = await notificationText.textContent();
        if (!textContent?.includes('Welcome back')) {
            throw new Error('Login failed: Welcome back message not found.');
        }
    }
}

import { defineConfig } from '@playwright/test';
import configData from './config.json';

export default defineConfig({
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                headless: false, // Set to true for headless testing
                baseURL: configData.baseUrl,
                viewport: null, // This makes it full-screen
                launchOptions: {
                    args: ['--start-maximized'], // Force browser to start maximized
                },
                screenshot: 'only-on-failure',
                trace: 'on',
            },
        },
        // You can add other browser configurations as needed
        {
            name: 'firefox',
            use: {
                browserName: 'firefox',
                headless: false, // Change to true if you want headless mode
                baseURL: configData.baseUrl,
                viewport: null, // This makes it full-screen
                launchOptions: {
                    args: ['--start-maximized'], // Force browser to start maximized
                },
                screenshot: 'only-on-failure',
                trace: 'on',
            },
        },

    ],
    testDir: './tests',
});

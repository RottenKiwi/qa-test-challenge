import { defineConfig } from '@playwright/test';
import configData from './config.json';

export default defineConfig({
    use: {
        browserName: 'chromium',
        headless: false,
        baseURL: configData.baseUrl,
        viewport: null, // This makes it full-screen
        launchOptions: {
            args: ['--start-maximized'], // Force browser to start maximized
        },
        screenshot: 'only-on-failure',
        trace: 'on',
    },
    testDir: './tests',
});

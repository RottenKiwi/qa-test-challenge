import { execSync } from 'child_process';
import * as readlineSync from 'readline-sync';
import { resolve } from 'path';

// Function to display test options and run the selected test
async function runTests() {
    // Step 1: Ask the user to select a test or "Run all tests"
    const testFiles = [
        'set_wager_limit.spec.ts',
        'login.spec.ts',
        'buy_reward.spec.ts'
    ];

    console.log('Select a test to run:');
    console.log('0. Run all tests');
    testFiles.forEach((test, index) => {
        console.log(`${index + 1}. ${test}`);
    });
    const testChoice = readlineSync.questionInt('Enter the number of the test you want to run: ') - 1;

    let selectedTest: string | null = null;
    let allTestsFlag = false;

    if (testChoice === -1) {
        allTestsFlag = true;
    } else {
        selectedTest = testFiles[testChoice];
    }

    // Step 2: Ask the user to select a browser
    const browsers = ['chromium', 'firefox'];
    console.log('Select a browser to run the test:');
    browsers.forEach((browser, index) => {
        console.log(`${index + 1}. ${browser}`);
    });
    const browserChoice = readlineSync.questionInt('Enter the number of the browser: ') - 1;
    const selectedBrowser = browsers[browserChoice];
    console.log(`Running test in browser: ${selectedBrowser}`);

    // Step 3: Run the selected test(s) with the selected browser
    try {
        let command = '';

        if (allTestsFlag) {
            command = `npx playwright test --project=${selectedBrowser} --reporter=html --workers=1`;
        } else if (selectedTest) {
            command = `npx playwright test ${selectedTest} --project=${selectedBrowser} --reporter=html`;
        }

        console.log(`Running command: ${command}`);
        execSync(command, { stdio: 'inherit' });

        // Step 4: Open the HTML report after the test run completes
        console.log('Test run completed.');
        const reportCommand = 'npx playwright show-report';
        execSync(reportCommand, { stdio: 'inherit' });
    } catch (error) {
        console.error('Error running tests:', error);
    }
}

runTests();

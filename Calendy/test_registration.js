const { Builder, By, until } = require('selenium-webdriver');

async function testUserRegistration() {
    // Initialize the WebDriver for Edge
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        // Navigate to the Calendy registration page
        await driver.get('http://localhost:3000/login'); // Replace with the actual URL of your Calendy registration page

        // Click on the registration link
        await driver.findElement(By.css(".register-form")).click();
        await driver.sleep(10000);  // Wait for the registration form to load

        // Fill in the registration form
        await driver.findElement(By.id('usernameInput')).sendKeys('testuser');
        await driver.findElement(By.id('passwordInput')).sendKeys('TestPassword123');
        await driver.findElement(By.id('reenterPasswordInput')).sendKeys('TestPassword123');
        await driver.findElement(By.id('securityPasswordInput')).sendKeys('SecurityPassword123');
        await driver.findElement(By.className('register-submit-btn')).click();

        // Wait for the alert to be present
        await driver.wait(until.alertIsPresent(), 10000);

        // Switch to the alert
        let alert = await driver.switchTo().alert();

        // Get the alert text
        let alertText = await alert.getText();

        // Validate the alert text
        if (alertText === 'User registered successfully') {
            console.log('Test passed: User registration successful');
        } else {
            console.log('Test failed: Unexpected alert text:', alertText);
        }

        // Accept the alert
        await alert.accept();
    } finally {
        // Close the WebDriver
        await driver.quit();
    }
}


testUserRegistration();

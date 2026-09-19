import {test, expect} from '@playwright/test';

test('My First Test', async({page}) => {

    await page.goto('https://www.google.com/');
    await page.locator('textarea[name="q"]').fill('Playwright');
    // await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    // const results = await page.locator('h3').allTextContents;
    // expect(results.length).toBeGreaterThan(0);
    const results = await page.locator('//span[contains(text(),"playwright")]').count();
    expect (results).toBeGreaterThan(0);
});
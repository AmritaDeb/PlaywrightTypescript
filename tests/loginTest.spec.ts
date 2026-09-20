import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test-data/loginData.json';

test('Valid Login Test', async({page}) => {

    const loginPage = new LoginPage(page);
    
    await loginPage.goToLoginPage('https://www.saucedemo.com/');
    await page.waitForTimeout(2000);

    // fetch data from json file
    await loginPage.login(loginData.valid_user.username, loginData.valid_user.password);
    await page.waitForTimeout(2000);

    // assertion
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});

test('Invalid Login Test', async({page}) => {

    const loginPage = new LoginPage(page);
    
    await loginPage.goToLoginPage('https://www.saucedemo.com/');
    await page.waitForTimeout(2000);

    // fetch data from json file
    await loginPage.login(loginData.invalid_user.username, loginData.invalid_user.password);
    await page.waitForTimeout(2000);

    // assertion
    await expect(loginPage.errorMessage).toBeVisible();

});
import {test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login Test', async({page}) => {

    const loginPage = new LoginPage(page);
    
    await loginPage.goToLoginPage('https://www.saucedemo.com/');
    await page.waitForTimeout(2000);
    await loginPage.login('standard_user','secret_sauce');
    await page.waitForTimeout(2000);
    await loginPage.verifyLoginSuccessfull('https://www.saucedemo.com/inventory.html');

});
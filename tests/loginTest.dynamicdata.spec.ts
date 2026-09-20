import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test-data/loginDynamicData.json';


loginData.forEach((data) => {
    if(!data.run) return;

    test(`Login Test - ${data.username}`, async({page}) => {

    const loginPage = new LoginPage(page);
    
    await loginPage.goToLoginPage('https://www.saucedemo.com/');
    await page.waitForTimeout(2000);

    // fetch data from json file
    await loginPage.login(data.username, data.password);
    await page.waitForTimeout(2000);

    // assertion
    if(data.expected === 'success'){
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    } else {
        await expect(loginPage.errorMessage).toBeVisible();
    }
    

});

})


import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {readCSV} from '../utils/csvReader';


const loginData = readCSV('test-data/LoginData.csv');


loginData.forEach((data : any) => {
    if(data.run !== 'true') return;

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


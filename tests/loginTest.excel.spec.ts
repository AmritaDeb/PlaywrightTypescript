import {expect, test} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import readExcel from '../utils/excelReader';

const testData = readExcel('./test-data/LoginData.xlsx','Sheet1');

test.describe('Login Tests',() => {
    for(const data of testData as any[]){
        if (data.run !== 'yes') continue;
        test(`Login test for - ${data.username}`, async ({page}) => {
            const loginPage = new LoginPage(page);
            await loginPage.goToLoginPage('https://www.saucedemo.com/');
             await page.waitForTimeout(2000);

            // fetch data from excel file
            await loginPage.login(data.username, data.password);
            await page.waitForTimeout(2000);

            // assertion
            if(data.expected === 'success'){
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            } else {
                await expect(loginPage.errorMessage).toBeVisible();
            }
        });
    }
})
// lec 46 test 

import{test,expect} from '@playwright/test'

import {NavigationPage} from '../page-objects/navigationPage'

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
})

test('Navigation to forms using POM', async({page})=>{

    const navPage= new NavigationPage(page); //create a new object of class

    await navPage.Navigate_toformslayoutpage(); //calling method 
await navPage.Navigate_DatePicker();

await navPage.Navigate_toModals();
await expect(page.getByText("Toaster configuration")).toBeVisible();


})
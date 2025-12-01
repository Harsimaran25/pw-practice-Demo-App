// lec 48 test 

import{test,expect} from '@playwright/test'

import {Navigation2Page} from '../page-objects/navigation2Page'

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
})

test('Navigation to forms using POM', async({page})=>{

    const navPage= new Navigation2Page(page); //create a new object of class

    await navPage.Navigate2_toformslayoutpage(); //calling method 
await navPage.Navigate2_DatePicker();

await navPage.Navigate2_toModals();
await expect(page.getByText("Toaster configuration")).toBeVisible();


})
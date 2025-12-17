////lec 49  this is  forms layout page  using pom


//npx playwright test secondtestPom.spec.ts --ui     

import{test,expect} from '@playwright/test'

import { formsLayoutPage } from '../page-objects/formLayoutsPage'

test.beforeEach( async({page})=>{

    await page.goto("http://localhost:4200/");
})


test('formsLayout page using pom', async({page})=>{

    const formPage= new formsLayoutPage(page);

    await formPage.Nav2Grid()
    await expect(page.getByText('Using the Grid', { exact: true }) ).toBeVisible({timeout:300})

    await formPage.submitfromGrid('abc@cc.com','Bhakha','option 2')
})
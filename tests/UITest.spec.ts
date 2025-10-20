
import {test,expect} from '@playwright/test'

//test to practice ui elements 

test.beforeEach(async({page})=>{

    await page.goto('http://localhost:4200/');
     await page.getByText('Forms').click();
await page.getByRole('link',{name:'Form Layouts'}).click();
});

test.only('UI elements practice',async({page})=>{

    const email1= page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'});

    await email1.fill('test@test.com');

});
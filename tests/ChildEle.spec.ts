
import {test,expect} from '@playwright/test'

test.beforeEach( async({page})=>{

    console.log('in before each hook');

    await page.goto('http://localhost:4200/');
   await page.getByText('Forms').click();

});

test.only('some locator practice', async({page})=>{

await page.getByRole('link',{name:'Form Layouts'}).click();
// await page.waitForLoadState('networkidle');
// let text= await page.locator('nb-card nb-radio').allTextContents();
// console.log(text);
// await page.pause();

//  let radio=await page.locator('nb-card-body nb-radio:has-text("Option 1")').isVisible();
// console.log(radio);

//await page.locator('nb-card-body nb-radio:has-text("Option 2") label').click(); // can use this also
//await page.locator('nb-card-body nb-radio label:has-text("Option 2")').click(); // can use this also
//  await expect(page.getByRole('textbox', { name: 'Jane Doe' })).toBeVisible();
//await page.locator('nb-card-body nb-radio label',{hasText:"Option 2"}).click(); // can use this also
   await page.getByText('Option 1').click(); //works good
  await page.getByText('Option 2').click();


});
//now lets see some examples to reduce flakiness using autowaiting, and creating wait for methods that do not have autowait
//  and assertions in Playwright

import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
 await page.goto("http://uitestingplayground.com/ajax");
 await page.getByRole('button',{name:'Button Triggering Ajax Request'}).click();

});

test('autowait and flakiness troubleshoot demo', async({page})=>{

    const Successbtn= page.locator('.bg-success');
//usually textcontent() and alltextcontents() can be flaky as they do not autowait
//we can do below step to make it autowait

// const Successbtntxt= await Successbtn.textContent();
// console.log(Successbtntxt);


await Successbtn.waitFor({state:'attached'});// this will trouble shoot for flakiness 
const ASuccessbtntxt= await Successbtn.allTextContents(); // without using line 22 code it will return empty array
console.log(ASuccessbtntxt);
expect(ASuccessbtntxt).toContain('Data loaded with AJAX get request.')

//locator assertion

await expect(Successbtn).toHaveText('Data loaded with AJAX get request.',{timeout:20000}); //added timeout of 20 secs

});

// //Rewritten Version Using Assertions (No Flakiness):
// test('autowait and flakiness troubleshoot demo', async ({ page }) => {
//   const successMsg = page.locator('.bg-success');

//   // Wait until the success message is visible and assert its content
//   await expect(successMsg).toBeVisible();

//   // Assert the expected text content (adjust if needed)
//   await expect(successMsg).toHaveText('Data loaded with AJAX get request.');

//   // Optionally print if you still want to debug
//   console.log(await successMsg.textContent());
// });

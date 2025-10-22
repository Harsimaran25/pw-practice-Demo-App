//create some smoke tests using test describe

import {test} from'@playwright/test'

test.describe('suite of smoke tests', ()=>{

 test('@smoke first test', async({page})=>{

await page.goto('https://google.com');
 });

test('@smoke test two', async({page})=>{

    await page.goto('https://yahoo.com')
})

test('not smoke test', async({page})=>{

    await page.goto('https://playwright.dev/docs/trace-viewer')
})

});
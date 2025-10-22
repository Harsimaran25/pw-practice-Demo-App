//create some smoke tests using test describe

import {test} from'@playwright/test'

test.describe('suite of smoke tests', ()=>{

 test('@smoke first test', async({page})=>{

await page.goto('https://google.com');
 });

test('@smoke test two', async({page})=>{

    await page.goto('https://yahoo.com')
});

test('not smoke test', async({page})=>{

    await page.goto('https://playwright.dev/docs/trace-viewer')
});

test('another test number 1', async({page})=>{

    await page.goto('http://localhost:4200/pages/modal-overlays/toastr')

});

test('another test number 2', async({page})=>{
  await page.goto('http://localhost:4200/pages/extra-components/calendar')
});

test('another test number 3', async({page})=>{

      await page.goto('http://localhost:4200/pages/charts/echarts')
});

});
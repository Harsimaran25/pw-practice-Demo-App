import {test} from '@playwright/test';


// to group test we can use test.describe and then the tests can sit inside it

test.describe('test suite 1', ()=>{


test('first test', async({page})=>{


     await page.goto('http://localhost:4200/');

     await page.getByText('Forms').click();
     await page.getByRole('link',{name:'Form Layouts'}).click();
     
})


})

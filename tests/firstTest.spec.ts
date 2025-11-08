import {test} from '@playwright/test';


// to group test we can use test.describe and then the tests can sit inside it


// now the tests inside this describe block will be grouped together
// we can have multiple describe blocks in a single file
// we can also nest describe blocks inside another describe block
//hooks like beforeEach, to perform some action before each test can also be used inside describe block
// various implementations of test.describe are like test.describe.only, test.describe.skip, test.describe.parallel
// test.describe.only will run only that describe block and skip all other tests in the file
// test.describe.skip will skip that describe block and run all other tests in the file
// test.describe.parallel will run all tests in that describe block in parallel with other tests in the file    
// by default all tests in a file run in parallel, but if we want to run tests in a file sequentially we can use test.describe.serial

test.beforeEach(async({page})=>{
    console.log('I will execute before each test in this file');
    await page.goto('http://localhost:4200/');
     await page.getByText('Forms').click();
});




test.describe('test suite 1', ()=>{


test.skip('first test', async({page})=>{


     //await page.goto('http://localhost:4200/');

    
     await page.getByRole('link',{name:'Form Layouts'}).click();

});

test.skip('datepicker test', async({page})=>{ 

await page.getByText('Datepicker').click();

})

test.only('locator practice', async({page})=>{
  await page.getByRole('link',{name:'Form Layouts'}).click();
  //page.locator('locator').action()
//using tag name
//  await page.locator('tagname' ,{}).action
//using text
//await page.locator('text=some text' ,{}).fill
//using exact text
//await page.locator('text="exact text"' ,{}).fill
//using id
//await page.locator('#id' ,{})  
//using class name
//await page.locator('.className' ,{})
//using attribute   
//await page.locator('[attribute="value"]' ,{})
//using combination of attributes
//await page.locator('[attribute1="value"][attribute2="value"]' ,{})
//by full class value
//await page.locator('[class="class value"]' ,{})
//using contains text   
//await page.locator('tagname:has-text("text")' ,{})
//using child to parent
//await page.locator('tagname:has-text("text") >> ..' ,{})
//using nth index
//await page.locator('tagname' ,{}).nth(1)  // 0 based index
//using first
//await page.locator('tagname' ,{}).first()
//using last
//await page.locator('tagname' ,{}).last()  
// by partial text
//await page.locator('text=partialtext' ,{})
// await page.locator(':text("sign in")').click()  

//by exact text 
// await page.locator('text-is("login button")')    


//await page.locator('input[id="inputEmail1"]').fill('Bhakha@bhakha.com')

});

test('Checkboxes', async({page})=>{

     
})


});// describe block ends here

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

 //await page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('textbox',{name:'email'}).click(); 

 //other way for line 31 can be below using filter
await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox',{name:'email'}).click(); 

await page.locator('#exampleInputEmail1').fill('test@test.com');
await page.locator('#exampleInputPassword1').fill('Welcome123');
//await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('button',{name:'SUBMIT'}).click();  OR 

await page.locator('nb-card',{hasText :'Basic form'}).getByRole('button',{name:'SUBMIT'}).click();

// extracting single text value
const buttontxt= await page.locator('nb-card',{hasText :'Basic form'}).locator('button').textContent();
console.log(buttontxt);

await expect(buttontxt).toEqual('Submit');

//lets try to capture multiple values like text in all radio buttons

const radiotxt= await page.locator('nb-radio').allTextContents(); // all tags with nb-radio

console.log(radiotxt);

//assertion if we want to check 
expect(radiotxt).toContain('Option 1');

//value for input field how to capture that lets see
const basicform= page.locator('nb-card',{hasText :'Basic form'})
const email1= basicform.getByRole('textbox',{name:'email'});
await email1.fill('test@test.com');

const emailval= await email1.inputValue();

expect(emailval).toEqual('test@test.com');

//now let us say u want to verify value of some DOM attribute
// let us say email field has placeholder attribute and we want to check value for this attribute

const placeholdervalue=await email1.getAttribute('placeholder');
console.log(placeholdervalue);

expect(placeholdervalue).toContain('Email');
const typeval= await email1.getAttribute('type');
console.log(typeval);

// there are 2 types of assertions general/generic and locator assertions

//general assetions 

const value =5 
expect(value).toEqual(5);  //there is no need of await here  it compares value which is 5 to 6 .
//other generic are like toBe , toBeTruthy,toContain
const basicformBtn= page.locator('nb-card',{hasText :'Basic form'}).locator('button');
const btntxt= await basicformBtn.textContent();
console.log(btntxt);
expect(btntxt).toEqual('Submit');

//locator assertion example

//lets assert button 

 await expect(basicformBtn).toHaveText('Submit')

 //soft assertions are also there like below example
 /**By default, failed assertion will terminate test execution. 
  * Playwright also supports soft assertions: failed soft assertions do not terminate test execution, but mark the test as failed */

// await expect.soft(basicformBtn).toHaveText('Submit5');// this will not fail the test but will log the error in the report and 
 // test will continue
 

await page.locator('nb-card',{hasText :'Basic form'}).getByRole('button',{name:'SUBMIT'}).click();
});

import {test,expect} from '@playwright/test'

//test to practice ui elements 

test.beforeEach(async({page})=>{

    await page.goto('http://localhost:4200/');
     await page.getByText('Forms').click();
await page.getByRole('link',{name:'Form Layouts'}).click();
});

test('UI elements practice',async({page})=>{

    const email1= page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'});

    await email1.fill('test@test.com');
    await email1.clear(); //will clear the textbox of the value entered

    //we cud also use press sequentially to mimic keyboard entry using delay as well
    await email1.pressSequentially('test2@test.com');
    await email1.clear();

       await email1.pressSequentially('test2@test.com',{delay:100}); //types slow like a user

       //assertion
    console.log(await email1.inputValue());
       await expect(email1).toHaveValue('test2@test.com');

       // some radio buttons

       const UsingGrid= page.locator('nb-card',{hasText:'Using the Grid'});

       const radiobtn= await UsingGrid.getByText('Option 1').click();
       //const radiobtn2= await UsingGrid.getByLabel('Option 2').click({force:true});
//const radiobtn2= await UsingGrid.getByLabel('Option 2').check({force:true});

//assertion generic

 const radiostatus= await UsingGrid.getByText('Option 1').isChecked();//ischecked will return true or false

expect(radiostatus).toBeTruthy();

//assertion locator based

await expect(UsingGrid.getByText('Option 1')).toBeChecked();

});

test('checkboxes', async({page})=>{
    await page.goto('http://localhost:4200/');

    await page.waitForLoadState('networkidle');
   await page.getByText('Modal & Overlays').click();
   await page.getByRole('link',{name:'Toastr'}).click();
   //await page.getByText('Toastr').click();

    await expect(page.getByText('Toaster configuration')).toBeVisible();
// await page.locator('.ng-star-inserted nb-card-header').waitFor({state:'visible'});
// let p= await page.locator('.ng-star-inserted nb-card-header').textContent();
// console.log(p);
// await expect(page.locator('.ng-star-inserted nb-card-header')).toContainText('Toaster configuration');

await page.getByText('Hide on click').click();
await page.getByText('Prevent arising').check();

//lets say you want to check all the check boxes on the page we cud use loop 


const allCheckboxes = page.locator('nb-checkbox');
const countcheck= await page.locator('nb-checkbox').count();
//we can use for of loop but all() will get all in the array but all() is flaky

// for(let box of await allCheckboxes.all()) //
//    {
//     await box.click();

// }


// better way to do is using nth and count

for( let i=0;i<countcheck;i++){

   await allCheckboxes.nth(i).click();

}

});

test('listitems test', async({page})=>{

// locators practice for  some drop downs

})

import {test,expect} from '@playwright/test'

//test to practice ui elements 

test.beforeEach(async({page})=>{

    await page.goto('http://localhost:4200/');
     await page.getByText('Forms').click();
await page.getByRole('link',{name:'Form Layouts'}).click();
});

test.skip('UI elements practice',async({page})=>{

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

test.skip('checkboxes', async({page})=>{
   //npx playwright test UITest.spec.ts --grep 'checkboxes'  will just run this test in the file
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
await page.getByText('Prevent arising').uncheck();
//lets say you want to check all the check boxes on the page we cud use loop 


const allCheckboxes = page.locator("nb-checkbox[type='checkbox']");
const countcheck= await allCheckboxes.count();
//we can use for of loop but all() will get all in the array but all() is flaky

// for(let box of await allCheckboxes.all()) //
//    {
//     await box.click();

// }


// better way to do is using nth and count

for( let i=0;i<countcheck;i++){

   await allCheckboxes.nth(i).check();
   expect(allCheckboxes.nth(i).isChecked()).toBeTruthy();

}



});

test('listitems test', async({page})=>{

// locators practice for  some drop downs
//await page.goto('http://localhost:4200/');

//await page.locator('button.bottom').click();
//await page.getByRole('button',{name:'Light'}).click();
const dropdown = page.locator('ngx-header nb-select')
//await page.pause();

 //page.getByRole('list') // can be used when list has UL tag
 //page.getByRole('listitem')// when the list has LI tag , will get all items in list as array

//await page.locator('.option-list',{hasText:" Cosmic"}).click();
//await expect(page.getByRole('button',{name:'Cosmic'})).toBeVisible();
//another way 
const optionlist= page.locator('nb-option-list nb-option')
//await optionlist.isVisible();
//assert options in the dropdown
// await expect(optionlist).toHaveText(['Light','Dark','Cosmic','Corporate'])

//   await optionlist.filter({hasText:'Cosmic'}).click();

//   //asserttion on background color 
   const headerlocator= page.locator('nb-layout-header');
//   await expect(headerlocator).toHaveCSS('background-color','rgb(50, 50, 89)');

  //assert all colors in case you want - then we will create object and put all colors in it 

  const colors={
   "Light":"rgb(255, 255, 255)",
   "Cosmic":"rgb(50, 50, 89)",
   "Dark":"rgb(34, 43, 69)",
   "Corporate":"rgb(255, 255, 255)"
  }
await dropdown.click();
  for (let color in colors){  //Use for...in when looping over object keys

  await optionlist.filter({hasText:color}).click();
  await expect(headerlocator).toHaveCSS('background-color',colors[color]);

  if(color != "Corporate"){ //If the current color is not 'Corporate', then click the dropdown again
// will execute until color is corporate
  await dropdown.click()
   
  } 
 
}

})

//Can implement using array as well :Just an array of names (and look up RGBs separately)

// const colorNames = ["Light", "Cosmic", "Dark", "Corporate"];
// const colors = {
//   "Light": "rgb(255, 255, 255)",
//   "Cosmic": "rgb(50, 50, 89)",
//   "Dark": "rgb(34, 43, 69)",
//   "Corporate": "rgb(255, 255, 255)"
// };

// await dropdown.click();

// for (const color of colorNames) {
//   await optionlist.filter({ hasText: color }).click();
//   await expect(headerlocator).toHaveCSS('background-color', colors[color]);

//   if (color === "Dark") {
//     // Stop once Dark is reached
//     break;
//   }

//   if (color !== "Corporate") {
//     await dropdown.click();
//   }
// }


//option 2 Array of objects (a bit cleaner)
// const colors = [
//   { name: "Light", value: "rgb(255, 255, 255)" },
//   { name: "Cosmic", value: "rgb(50, 50, 89)" },
//   { name: "Dark", value: "rgb(34, 43, 69)" },
//   { name: "Corporate", value: "rgb(255, 255, 255)" }
// ];

// await dropdown.click();
//Use for...of when looping over arrays
// for (const { name, value } of colors) {
//   await optionlist.filter({ hasText: name }).click();
//   await expect(headerlocator).toHaveCSS('background-color', value);

//   if (name === "Dark") {
//     // Exit loop when color is Dark
//     break;
//   }

//   if (name !== "Corporate") {
//     await dropdown.click();
//   }
// }

test('toolTips', async({page})=>{

//DOM tool tip
 await page.goto('http://localhost:4200/');
  await page.waitForLoadState('networkidle');
   await page.getByText('Modal & Overlays').click();
 //await page.getByRole('link',{name:'Tooltip'}).click();
 await page.locator('[title="Tooltip"]').click();
// await page.waitForLoadState('networkidle');
console.log(page.url())
 await expect(page).toHaveURL(/.*\/tooltip/)
console.log('post expect',page.url())

const toolTipCard= page.locator('nb-card', {hasText:"Tooltip Placements"})
await toolTipCard.getByRole('button',{name:'TOP'}).hover();

//page.getByRole('tooltip') // this will only work if there is role tooltip created in dom but in our case its not there.
console.log(await page.locator('nb-tooltip').textContent())
await expect(page.locator('nb-tooltip')).toHaveText('This is a tooltip');



});

test('Dialog Boxes', async({page})=>{


});
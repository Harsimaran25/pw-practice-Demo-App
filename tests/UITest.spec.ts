import { test, expect } from "@playwright/test";
import { TRUE } from "sass";

//test to practice ui elements

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByRole("link", { name: "Form Layouts" }).click();
});

test.skip("UI elements practice", async ({ page }) => {
  const email1 = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });

  await email1.fill("test@test.com");
  await email1.clear(); //will clear the textbox of the value entered

  //we cud also use press sequentially to mimic keyboard entry using delay as well
  await email1.pressSequentially("test2@test.com");
  await email1.clear();

  await email1.pressSequentially("test2@test.com", { delay: 100 }); //types slow like a user

  //assertion
  console.log(await email1.inputValue());
  await expect(email1).toHaveValue("test2@test.com");

  // some radio buttons

  const UsingGrid = page.locator("nb-card", { hasText: "Using the Grid" });

  const radiobtn = await UsingGrid.getByText("Option 1").click();
  //const radiobtn2= await UsingGrid.getByLabel('Option 2').click({force:true});
  //const radiobtn2= await UsingGrid.getByLabel('Option 2').check({force:true});

  //assertion generic

  const radiostatus = await UsingGrid.getByText("Option 1").isChecked(); //ischecked will return true or false

  expect(radiostatus).toBeTruthy();

  //assertion locator based

  await expect(UsingGrid.getByText("Option 1")).toBeChecked();
});

test.skip("checkboxes", async ({ page }) => {
  //npx playwright test UITest.spec.ts --grep 'checkboxes'  will just run this test in the file
  await page.goto("http://localhost:4200/");

  await page.waitForLoadState("networkidle");
  await page.getByText("Modal & Overlays").click();
  await page.getByRole("link", { name: "Toastr" }).click();
  //await page.getByText('Toastr').click();

  await expect(page.getByText("Toaster configuration")).toBeVisible();
  // await page.locator('.ng-star-inserted nb-card-header').waitFor({state:'visible'});
  // let p= await page.locator('.ng-star-inserted nb-card-header').textContent();
  // console.log(p);
  // await expect(page.locator('.ng-star-inserted nb-card-header')).toContainText('Toaster configuration');

  await page.getByText("Hide on click").click();
  await page.getByText("Prevent arising").check();
  await page.getByText("Prevent arising").uncheck();
  //lets say you want to check all the check boxes on the page we cud use loop

  const allCheckboxes = page.locator("nb-checkbox[type='checkbox']");
  const countcheck = await allCheckboxes.count();
  //we can use for of loop but all() will get all in the array but all() is flaky

  // for(let box of await allCheckboxes.all()) //
  //    {
  //     await box.click();

  // }

  // better way to do is using nth and count

  for (let i = 0; i < countcheck; i++) {
    await allCheckboxes.nth(i).check();
    expect(allCheckboxes.nth(i).isChecked()).toBeTruthy();
  }
});

test("listitems test", async ({ page }) => {
  // locators practice for  some drop downs
  //await page.goto('http://localhost:4200/');

  //await page.locator('button.bottom').click();
  //await page.getByRole('button',{name:'Light'}).click();
  const dropdown = page.locator("ngx-header nb-select");
  //await page.pause();

  //page.getByRole('list') // can be used when list has UL tag
  //page.getByRole('listitem')// when the list has LI tag , will get all items in list as array

  //await page.locator('.option-list',{hasText:" Cosmic"}).click();
  //await expect(page.getByRole('button',{name:'Cosmic'})).toBeVisible();
  //another way
  const optionlist = page.locator("nb-option-list nb-option");
  //await optionlist.isVisible();
  //assert options in the dropdown
  // await expect(optionlist).toHaveText(['Light','Dark','Cosmic','Corporate'])

  //   await optionlist.filter({hasText:'Cosmic'}).click();

  //   //asserttion on background color
  const headerlocator = page.locator("nb-layout-header");
  //   await expect(headerlocator).toHaveCSS('background-color','rgb(50, 50, 89)');

  //assert all colors in case you want - then we will create object and put all colors in it

  const colors = {
    Light: "rgb(255, 255, 255)",
    Cosmic: "rgb(50, 50, 89)",
    Dark: "rgb(34, 43, 69)",
    Corporate: "rgb(255, 255, 255)",
  };
  await dropdown.click();
  for (let color in colors) {
    //Use for...in when looping over object keys

    await optionlist.filter({ hasText: color }).click();
    await expect(headerlocator).toHaveCSS("background-color", colors[color]);

    if (color != "Corporate") {
      //If the current color is not 'Corporate', then click the dropdown again
      // will execute until color is corporate
      await dropdown.click();
    }
  }
});

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

test("toolTips", async ({ page }) => {
  //DOM tool tip
  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Modal & Overlays").click();
  //await page.getByRole('link',{name:'Tooltip'}).click();
  await page.locator('[title="Tooltip"]').click();
  // await page.waitForLoadState('networkidle');
  console.log(page.url());
  await expect(page).toHaveURL(/.*\/tooltip/);
  console.log("post expect", page.url());

  const toolTipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  await toolTipCard.getByRole("button", { name: "TOP" }).hover();

  //page.getByRole('tooltip') // this will only work if there is role tooltip created in dom but in our case its not there.
  console.log(await page.locator("nb-tooltip").textContent());
  await expect(page.locator("nb-tooltip")).toHaveText("This is a tooltip");
});

test("Dialog Boxes", async ({ page }) => {
  // 2 types of dialog box like web dialog box and native browser message dialog box

  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Modal & Overlays").click();
  await page.getByRole("link", { name: "Dialog" }).click();
  console.log(page.url());
  await expect(page).toHaveURL(/.*\/dialog/);
  console.log("post expect", page.url());

  const openDialog = page.locator("nb-card", { hasText: "Open Dialog" });
  await openDialog
    .locator("nb-card-body button", { hasText: "Open Dialog with component" })
    .click();
  await expect(page.locator("nb-dialog-container")).toBeVisible();
  //  page.on('dialog',dialog=>dialog.accept());//listen for event =dialog
  //  await page.locator('#confirmbtn').click();

  await page.locator("Nb-card-footer button").click();
});

test("Dialog Boxes2", async ({ page }) => {
  // lets see native browser message dialog box

  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Tables & Data").click();
  await page.getByRole("link", { name: "Smart Table" }).click();
  console.log(page.url());
  await expect(page).toHaveURL(/.*\/smart-table/);
  console.log("post expect", page.url());

  // const tablerow= page.locator('table tr')
  // console.log(await tablerow.filter({hasText:'fat@yandex.ru'}).textContent())
  //set up listener as  playwright by default cancels the dialog box
  page.on("dialog", (dialog) => {
    // we can make assertion as well to check dialog box

    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  }); //listen for event =dialog

  await page
    .getByRole("table")
    .locator("tr", { hasText: "fat@yandex.ru" })
    .locator(".nb-trash")
    .click();

  //assertion to check it does not exist
  //await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru');
  // await tablerow.filter({hasText:'fat@yandex.ru'}).locator('.nb-trash').click();

  //better way to assert is check count -- preferred
  const deletedRow = page
    .getByRole("table")
    .locator("tr", { hasText: "fat@yandex.ru" });
  await expect(deletedRow).toHaveCount(0);
  // OR
  // const row = page.getByRole('table').locator('tr', { hasText: 'fat@yandex.ru' });
  // expect(await row.isVisible()).toBeFalsy();
});

test("Webtables 1", async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Tables & Data").click();
  await page.getByRole("link", { name: "Smart Table" }).click();
  console.log(page.url());
  await expect(page).toHaveURL(/.*\/smart-table/);
  console.log("post expect", page.url());

  // how to get row by any text in the table
  // do dynamically instead of hardcoding
  const email = "twitter@outlook.com";
  const agetoUpdate = "30";
  const targetrow = page.getByRole("row", { name: email });
  //lets click on pencil icon to edit age of this row

  await targetrow.locator(".nb-edit").click();

  //await page.locator("input-editor [placeholder='Age']").fill(agetoUpdate)
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill(agetoUpdate);
  await page.locator("i.nb-checkmark").click();

  await expect(
    targetrow.locator("div.ng-star-inserted", { hasText: agetoUpdate })
  ).toContainText(agetoUpdate);
});

test("Webtables 1 scenario2", async ({ page }) => {
  // now lets say we want to find row by ID and uniquely identify it as there is no direct way to select column
  // we have to go to row then cell
  const email1 = "twitter232@outlook.com";

  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Tables & Data").click();
  await page.getByRole("link", { name: "Smart Table" }).click();

  await page.getByRole("link", { name: "2" }).click();

  //const targetrowbyId= page.getByRole('row',{name:'11'}).filter({has:page.locator('td').nth(1).getByText('11')})
  //OR
  const targetcell = page.locator("tr", {
    has: page.locator("td").nth(1).getByText("11"),
  });
  await targetcell.locator(".nb-edit").click();

  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page.locator("input-editor").getByPlaceholder("E-mail").fill(email1);
  await page.locator("i.nb-checkmark").click();

  await expect(targetcell.locator("td").nth(5)).toHaveText(email1);
});

test("Webtables Scenario3_lec40", async ({ page }) => {
  // let say we want to know put some value in table like age column u enter 20 then some rows will be filtered
  // then lets get those rows and find a specific row in them

  const ages = ["20", "30", "300"];
  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Tables & Data").click();
  await page.getByRole("link", { name: "Smart Table" }).click();

  for (let age of ages) {
    await page.getByRole("textbox", { name: "Age", exact: true }).clear();
    await page
      .getByRole("textbox", { name: "Age", exact: true })
      .pressSequentially(age, { delay: 300 });
    //await page.locator('tbody').waitFor({state:'visible'})
    //await page.waitForLoadState('domcontentloaded')
    const rows = page.locator("tbody tr");
    await rows.first().waitFor({ state: "attached" });
    const countRows = await rows.count();
    console.log(`rows for ${age} are ,`, countRows);
    for (let i = 0; i < countRows; i++) {
      const cellvalue = rows.nth(i).locator("td").last();
      await expect(cellvalue).toBeVisible();
      const textvalue = await cellvalue.textContent();
      console.log("text is", textvalue);
      if (textvalue.includes("No data found")) {
        console.log("No data found  for age-", age);
        continue;
      } else {
        console.log("in else");
        expect(textvalue).toEqual(age);
      }
    }
  }
});

// date picker - dyanmically1
test("DatePicker 1", async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Forms").click();
  await page.getByRole("link", { name: "Datepicker" }).click();
  await page.getByRole("textbox", { name: "Form Picker" }).click();
  await page.locator("nb-calendar").waitFor({ state: "visible" });
 
  let day = "17";
  let month = "DEC";
  let yearrtopick = "2027";

  let yearCalendar = page.locator(".calendar-navigation");
  await yearCalendar.click();
  let yearSelect = page.locator(".year-cell");

  while (true) {
    const yearrs = await yearSelect.allInnerTexts();
    console.log(yearrs);

    if (yearrs.includes(yearrtopick)) {
      await page.locator(".cell-content", { hasText: yearrtopick }).click();
      await page.locator(".month-cell", { hasText: month }).click();

      await page.waitForTimeout(200);
      await expect(page.locator("nb-calendar-day-cell").first()).toBeVisible();

      console.log(await page.locator("nb-calendar-day-cell").allTextContents());

      let calRows = page.locator("nb-calendar-picker-row");

      let rowcount = await calRows.count();
      console.log(rowcount);

      for (let i = 0; i < rowcount; i++) {
        let dayinrow = await calRows
          .nth(i)
          .locator("[class='day-cell ng-star-inserted']")
          .allInnerTexts();
        console.log(dayinrow);
        if (dayinrow.includes(day)) {
          await calRows
            .nth(i)
            .locator("nb-calendar-day-cell")
            .filter({ hasText: day })
            .click();
        }
      }

      break;
    }
  }
});


test('DatePicker 2', async({page})=>{

// select date dynamically 

await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Forms").click();
  await page.getByRole("link", { name: "Datepicker" }).click();
  await page.getByRole("textbox", { name: "Form Picker" }).click();
  await page.locator("nb-calendar").waitFor({ state: "visible" });
 
  let day = "13";
  let month = "JAN";
  let yearrtopick = "2037";

  

while(true)
{
  
 let yearCal=page.locator('.calendar-navigation') 
 await yearCal.click();
   let yearstext=await page.locator('.year-cell').allInnerTexts()
   console.log(yearstext)
  console.log(yearstext[0])
  console.log(yearstext[yearstext.length-1])

  if (parseInt(yearrtopick) >= parseInt(yearstext[0]) && parseInt(yearrtopick)<= parseInt(yearstext[yearstext.length-1])) {
 
    if(yearstext.includes(yearrtopick)){

    await page.locator(".cell-content", { hasText: yearrtopick }).click();
     await page.locator(".month-cell", { hasText: month }).click();
    break;
  }


  }
  else if(parseInt(yearrtopick) > parseInt(yearstext[yearstext.length - 1]))
  {

    
    await page.locator("[data-name='chevron-right']").click()
    let yearstext=await page.locator('.year-cell').allInnerTexts()
   console.log(yearstext)
  console.log(yearstext[0])
  console.log(yearstext[yearstext.length-1])
    await page.locator('.year-cell').getByText(yearrtopick).click()
    await page.locator(".month-cell", { hasText: month }).click();
   
    break;
  }
  else {
      await page.locator("[data-name='chevron-left']").click();
      await page.locator('.year-cell').getByText(yearrtopick).click()
    await page.locator(".month-cell", { hasText: month }).click();
//     await page.locator("[class='day-cell ng-star-inserted']").getByText(day).click()
//       const val=await page.locator("[placeholder='Form Picker']").inputValue()
// console.log( val)
    break;
    }

   
  
}
 await page.locator("[class='day-cell ng-star-inserted']").getByText(day).click()
    const val=await page.locator("[placeholder='Form Picker']").inputValue()
console.log( val)

})

//lets optimise the above DatePicker 2 as there is lot of code repeated

test('DatePicker 3 optimised',async({page})=>{

  let target_day  = "13";
  let target_month = "Jan";
  let target_year  = "2025";

await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Forms").click();
  await page.getByRole("link", { name: "Datepicker" }).click();

await page.getByRole("textbox", { name: "Form Picker" }).click();
  await page.locator("nb-calendar").waitFor({ state: "visible" });

const nav_calendar={
  previous: page.locator("[data-name='chevron-left']"),
  next: page.locator("[data-name='chevron-right']")
}

 
 
   
  
   const year_Range= async ()=>{

const years_cal=await page.locator('.year-cell').allInnerTexts()

    return{

      years:years_cal,
      min:parseInt(years_cal[0]),
      max:parseInt(years_cal[years_cal.length-1])
    }
   } 
    
while(true){
   
  const targetyearInt=parseInt(target_year)
  const {years, min, max}= await year_Range()
  
await page.locator('.calendar-navigation').click()

  if(targetyearInt >= min && targetyearInt <= max){
  console.log('years are',years)
  console.log('min year',min)
     await page.locator(".cell-content", { hasText: target_year}).click();
     await page.locator(".month-cell", { hasText: target_month }).click();
    break;

  }

  if(targetyearInt>max){
console.log('years are',years)
  console.log('min year',min)
    await nav_calendar.next.click()
    continue;
  }

  if(targetyearInt<min){
    console.log('years are',years)
  console.log('min year',min)
    await nav_calendar.previous.click()
    continue;
  }

}//while end

 await page.locator("[class='day-cell ng-star-inserted']").getByText((target_day).toUpperCase(),{exact:true}).click()
    const val=await page.locator("[placeholder='Form Picker']").inputValue()
console.log( val)

   expect(val).toContain(target_month);
  expect(val).toContain(target_day);
  expect(val).toContain(target_year);
   


})

test('DatePicker 4 lec_42', async({page})=>{
//dynamically select date using javascript object

//lets use date from javascript

let date1 =new Date();
console.log(date1)
console.log(date1.getDate())
console.log(date1.getFullYear())


date1.setDate(date1.getDate() + 100) //100 days from current day
console.log(date1)
const expectedDate=date1.getDate().toString();
const expectedMonth= date1.toLocaleString('En-US',{month:'short'})
console.log(expectedMonth)

const expectedMonthLong=date1.toLocaleString('En-US',{month:'long'})
console.log(expectedMonthLong)
const expectedYear=date1.getFullYear();


await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");
  await page.getByText("Forms").click();
  await page.getByRole("link", { name: "Datepicker" }).click();
const calValue= page.getByRole("textbox", { name: "Form Picker" })
await page.getByRole("textbox", { name: "Form Picker" }).click();
  await page.locator("nb-calendar").waitFor({ state: "visible" });
 // await page.locator('.calendar-navigation').click()

//await page.locator(".cell-content", { hasText: target_year.toString()}).click();

let CalMonYear=await page.locator('nb-calendar-view-mode').textContent()
console.log(CalMonYear)
const expectedMonthandYear=` ${expectedMonthLong} ${expectedYear} `
console.log(expectedMonthandYear)

const dateToAssert=`${expectedMonth} ${expectedDate}, ${expectedYear}`

while(!CalMonYear.includes(expectedMonthandYear))
  {

await page.locator("[data-name='chevron-right']").click()
 CalMonYear=await page.locator('nb-calendar-view-mode').textContent()
}

await page.locator("[class='day-cell ng-star-inserted']").getByText(expectedDate,{exact:true}).click()

await expect(calValue).toHaveValue(dateToAssert)
})






//sliders webelement

test('Sliders Test approach 1', async({page})=>{

  //updating slider attributes like cx and cy - coordinates /pixels - this approach is not simulation of mouse
  await page.goto("http://localhost:4200/");
  await page.waitForLoadState("networkidle");

  const tempGuage=page.locator("[tabtitle='Temperature'] ngx-temperature-dragger circle")
// now to get those x and y coordinates// so using locator.evaluate

await tempGuage.evaluate( xy=>{

  xy.setAttribute('cx','230.836')// set for 30 degress
  xy.setAttribute('cy','230.836')
})

const tempcel= page.locator('.value.temperature')
await tempGuage.click() // so that browser can register change and change value to 30 cel
await expect(tempcel).toContainText(' 30 ')

})

test('Sliders Approach 2 better one', async({page})=>{

// this time we use the approach which mimics real user sliding the slider instead of passing x and y co-ordinates
//actual mouse movement
//first define or find area we want to move mouse

})

// POM file - this is class for navigation menu using POM lec48 artembondar
// now lets separate the locators and optimise our navigation class 
// this approach is not best as overtime we may have so many locators and so many methods 

import { Locator, Page } from "@playwright/test";

export class Navigation2Page {

  readonly page: Page; // variable page is of type Page
  readonly formLayoutLocator: Locator; // creating locators used in methods
  readonly modallocator: Locator;
  readonly tableLocator: Locator;
  readonly datePickerLocator: Locator;
  readonly toolTipLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formLayoutLocator=page.getByRole("link", { name: "Form Layouts" });
    this.modallocator=page.getByText("Modal & Overlays");
    this.tableLocator =page.getByText("Tables & Data");
    this.datePickerLocator=page.getByRole("link", { name: "Datepicker" });
    this.toolTipLocator=page.locator('[title="Tooltip"]')
  }

  //method

  async Navigate2_toformslayoutpage() {
   // await this.page.getByText("Forms").click();
   await this.menu2_expandCheck('Forms')
    await this.formLayoutLocator.click();
  }

  async Navigate2_toModals() {
    await this.modallocator.click();
    await this.page.getByRole("link", { name: "Toastr" }).click();
  }

  async Navigate2_toTables() {
    await this.tableLocator.click();
    await this.page.getByRole("link", { name: "Smart Table" }).click();
  }

  async Navigate2_DatePicker() {
     await this.menu2_expandCheck('Forms')
    
    await this.datePickerLocator.click();
    
    await this.page.getByRole("textbox", { name: "Form Picker" }).click();
  }

  async Navigate2_tooltip() {
    //await this.page.getByText("Modal & Overlays").click();
    await this.menu2_expandCheck('"Modal & Overlays"')
    //await page.getByRole('link',{name:'Tooltip'}).click();
    await this.toolTipLocator.click();
  }

  //now in  forms we need to make sure our test is smart enough to know if the forms is expanded or not
  //lets create a helper method for these methods above to use only for this class and set it as private

// helper method
  private async menu2_expandCheck(itemTitle: string) {

    const menuItem= this.page.getByTitle(itemTitle);
    const state_expanded= await menuItem.getAttribute('aria-expanded') // this aria-expanded attribute from dom we are using to control
if(state_expanded== 'false') {

    await menuItem.click()
}

  }

} // class end

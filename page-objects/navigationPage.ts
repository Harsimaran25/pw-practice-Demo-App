// POM file - this is class for navigation menu using POM lec46 artembondar

import { Page } from "@playwright/test";

export class NavigationPage {

  readonly page: Page; // variable page is of type Page

  constructor(page: Page) {
    this.page = page;
  }

  //method

  async Navigate_toformslayoutpage() {
   // await this.page.getByText("Forms").click();
   await this.menu_expandCheck('Forms')
    await this.page.getByRole("link", { name: "Form Layouts" }).click();
  }

  async Navigate_toModals() {
    await this.page.getByText("Modal & Overlays").click();
    await this.page.getByRole("link", { name: "Toastr" }).click();
  }

  async Navigate_toTables() {
    await this.page.getByText("Tables & Data").click();
    await this.page.getByRole("link", { name: "Smart Table" }).click();
  }

  async Navigate_DatePicker() {
     await this.menu_expandCheck('Forms')
    
    await this.page.getByRole("link", { name: "Datepicker" }).click();
    
    await this.page.getByRole("textbox", { name: "Form Picker" }).click();
  }

  async Navigate_tooltip() {
    //await this.page.getByText("Modal & Overlays").click();
    await this.menu_expandCheck('"Modal & Overlays"')
    //await page.getByRole('link',{name:'Tooltip'}).click();
    await this.page.locator('[title="Tooltip"]').click();
  }

  //now in  forms we need to make sure our test is smart enough to know if the forms is expanded or not
  //lets create a helper method for these methods above to use only for this class and set it as private

// helper method
  private async menu_expandCheck(itemTitle: string) {

    const menuItem= this.page.getByTitle(itemTitle);
    const state_expanded= await menuItem.getAttribute('aria-expanded') // this aria-expanded attribute from dom we are using to control
if(state_expanded== 'false') {

    await menuItem.click()
}

  }

} // class end

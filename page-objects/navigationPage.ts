// this is class for navigation menu using POM lec46 artembondar

import{Page} from '@playwright/test'


export class NavigationPage{

    
readonly page: Page  // variable page is of type Page

    constructor(page: Page){

        this.page=page
    }

//method

async Navigate_toformslayoutpage()

{

await this.page.getByText("Forms").click()
await this.page.getByRole("link", { name: "Form Layouts" }).click();
}


} // class end
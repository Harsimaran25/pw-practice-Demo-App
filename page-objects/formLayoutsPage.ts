//lec 49  this is to create page obj for forms layout page 

import{Page, Locator} from '@playwright/test'

export class formsLayoutPage {

    private readonly page: Page;
    private readonly formLayout: Locator;
    private readonly forms: Locator;
    private readonly emailfield: Locator;
    private readonly password: Locator;
    private readonly gridlocator: Locator;
   

    constructor (page: Page  ){

        this.page=page;
      
        this.gridlocator=page.locator("nb-card", { hasText: "Using the Grid" })
        this.emailfield= this.gridlocator.getByRole("textbox", { name: "Email" });
        this.forms=page.getByText("Forms");
        this.formLayout=page.getByRole("link", { name: "Form Layouts" });
        this.password= this.gridlocator.getByRole("textbox", { name: "Password" });
        
    }

//methods

//navigate to grid

async Nav2Grid (){

    await this.forms.click();

 await this.formLayout.click();

}

// paramaterised method - this method is to submit the using the grid form with credentials and select option
// email password and optiontxt are parameters

async submitfromGrid(email: string, passWord: string, optiontxt: string){
     

  await this.emailfield.fill(email);
  await this.password.fill(passWord);
  await this.gridlocator.getByText(optiontxt).click()
}

} //class end
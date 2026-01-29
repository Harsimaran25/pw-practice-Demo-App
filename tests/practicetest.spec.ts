import  {test,expect} from '@playwright/test'

//practice test for website 

test('Practice Locators', async({page})=>{

    await page.goto('http://localhost:4200/pages/iot-dashboard')
    await expect (page.locator('a.logo')).toHaveText('PW-test')

    await page.getByRole('link',{name:'Forms'}).click()

//      await page.getByText("Modal & Overlays").click();
//   await page.getByRole("link", { name: "Toastr" }).click();
    
    await page.locator('a[title="Form Layouts"]').click();

    let inline_form=page.locator('nb-card-header',{hasText:'Inline form'})
    await expect(inline_form).toContainText('Inline form')

        const using_grid_locator= page.locator('nb-card',{hasText:'Using the Grid'});
    let email_1= using_grid_locator.getByRole('textbox',{name:'Email'})
    const passWord_1=using_grid_locator.getByRole('textbox',{name:'Password'})

    
    await email_1.fill('abc@abc.com')
    await passWord_1.fill('Bhakha')

    console.log(await email_1.inputValue())

    const radio_1=using_grid_locator.getByText('Option 1',{exact:true})

    await radio_1.click();

})
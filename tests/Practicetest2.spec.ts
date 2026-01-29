//test to practice playwright

import{test} from '@playwright/test'
import { Browser } from 'leaflet'

test.skip('Navigate to test page', async({browser})=>{

    let Newbrowser= await browser.newContext();
    let page1=await Newbrowser.newPage();

    await page1.goto('https://yahoo.com')

    // await page1.locator('input.bg-transparent').fill('playwright')
    // await page1.locator("[aria-label='Search the web']").click()

    await page1.getByPlaceholder('Search the web',{exact:true}).fill('playwright')
    await page1.getByRole('button',{name:'Search the web'}).click()


})

test('Rahul shetty website test',async({page})=>{

     await page.goto("https://rahulshettyacademy.com/loginpagePractise")
     //regex
})

test('Using the Grid2', async ({page})=>{

    await page.goto('http://localhost:4200/')

    await page.getByRole('link',{name:'Forms'}).click()
    await page.getByRole('link',{name:'Form Layouts'}).click()

    await page.locator('nb-card', {hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'}).fill('Bhakha@bhakha.com')


})
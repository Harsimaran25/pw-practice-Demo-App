import{test,expect} from '@playwright/test'
import { popup } from 'leaflet'

//lec 44 artem bondar

test('Drag&Drop test 1 lec 44', async({page})=>{

 // await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
 await page.goto('https://www.globalsqa.com/testers-hub/')

 await page.locator('a.no_border:has-text("TESTER\’S HUB")').hover()
 await page.locator("[id='menu-item-2823']").hover()


    await page.getByRole('link',{name:'Drag And Drop'}).click()

    //below code is to remove google ad popups page.on will not work as they are modal overlays not native browser 

// page.on('frameattached', async frame => {
//   if (frame.url().includes('googleads')) {
//     console.log('Ad frame attached, trying to close...');
//     try {
//       const closeBtn = await frame.waitForSelector('#dismiss-button', { timeout: 2000 });
//       await closeBtn.click();
//     } catch {
//       console.log('No close button found in ad frame');
//     }
//   }
// })


/////////////


 await page.waitForLoadState('networkidle')
 const heading= page.locator('h1', {hasText:'Drag And Drop'})
await expect(heading).toBeVisible()
//pass locator to framelocator method
 const frame=page.frameLocator("[rel-title='Photo Manager'] .demo-frame") //[rel-title='Photo Manager'] iframe
const target=frame.locator("#trash")
await frame.locator('li',{hasText:'High Tatras 2'}).dragTo(target)


})


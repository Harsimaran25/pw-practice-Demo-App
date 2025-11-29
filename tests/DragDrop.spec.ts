
//lec 44 artem bondar

test('Drag&Drop test 1 lec 44', async({page})=>{

 // await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
 await page.goto('https://www.globalsqa.com/testers-hub/')

 await page.getByRole('link', {name:'TESTER\'s HUB'}).hover()

 await page.locator('a', {hasText:'Drag and Drop'}).click()


})
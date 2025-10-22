// //this is test to see how to use schema validation for   response
// import Ajv from "ajv";
// import{test,request} from'@playwright/test'

// //const Ajv=require("ajv")

// test('to validate json response schema')
// const ajv= new Ajv();

// // Define your JSON schema
// const schema ={
//  type:'Object',
//  properties:{
// name:{type:'string'},
// age:{type:'number'}

//  },
// required:['name','age']
// };
// // Use ajv.compile(schema) to get a validator function.

// // Call it with your data: validate(data).

// // Check the result and validate.errors if invalid.

// // Use options like allErrors, strict: false for better control.

// // Example JSON to validate
// const data = {
//   name: 'John Doe',
//   age: 30,
  
// };

// // Compile and validate
// const response = await page.request.get('/api/data');
// const body = await response.json();

// const validate = ajv.compile(schema);
// const valid = validate(body);

// expect(valid, JSON.stringify(validate.errors)).toBe(true);
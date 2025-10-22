

const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const fs = require('fs');
// Load schema from external file this external file has schema defined in it 

test('to validate response schema', async({})=>
    {
const schemaText = await fs.readFile('./TestSchema.json', 'utf-8');
const schema = JSON.parse(schemaText);
const ajv = new Ajv();
const validate = ajv.compile(schema);

// Sample data to validate
const data = {
  name: 'Alice',
  age: 28,
  email: 'alice@example.com'
};

const valid = validate(data);

if (valid) {
  console.log('Data is valid');
} else {
  console.log(' Data is invalid');
  console.log(validate.errors);
}

})


const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const fs = require('fs');

test('validate API response matches schema', async ({ request }) => {
  // Load and compile your JSON schema
  const schema = JSON.parse(fs.readFileSync('./response.schema.json', 'utf-8'));
  const ajv = new Ajv();
  const validate = ajv.compile(schema);  //compiles schemas to functions 

  // Make an API request
  const response = await request.get('https://your-api.com/users/1');
  expect(response.ok()).toBeTruthy();

  // Parse response JSON
  const responseBody = await response.json();

  // Validate response against schema
  const valid = validate(responseBody);

  // Assert validation success
  expect(valid, JSON.stringify(validate.errors, null, 2)).toBe(true);

 // OR expect(valid).toBe(true);
  
  // JSON.stringify(validate.errors, null, 2) which converts Ajv’s validation errors to a nicely formatted string.
});



// below is TS version of above 

// import { test, expect, APIResponse } from '@playwright/test';
// import Ajv, { ValidateFunction } from 'ajv';
// import * as fs from 'fs';

// // Define schema type as `any` because it's JSON
// const schema: any = JSON.parse(fs.readFileSync('./response.schema.json', 'utf-8'));

// const ajv = new Ajv();
// const validate: ValidateFunction = ajv.compile(schema);

// test('validate API response matches schema', async ({ request }) => {
//   const response: APIResponse = await request.get('https://your-api.com/users/1');
//   expect(response.ok()).toBeTruthy();

//   const responseBody = await response.json();

//   const valid = validate(responseBody);
//   expect(valid, JSON.stringify(validate.errors, null, 2)).toBe(true);
// });

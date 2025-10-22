// test to validate request body using AJV

const { test, expect } = require("@playwright/test");
const Ajv = require("ajv");
const fs = require("fs");

// Load and compile your request schema
const schema = JSON.parse(fs.readFileSync("./request.schema.json", "utf-8"));
const ajv = new Ajv();
const validateRequestBody = ajv.compile(schema); //converts schema into a validation function using ajv.compile().

test("should validate outgoing request against schema", async ({ page }) => {
  // Intercept the API request
  await page.route("**/api/users", async (route, request) => {
    const body = JSON.parse(request.postData()); // request.postData() Gets the body of that request and returns body of the request as a string

    const valid = validateRequestBody(body); /// returns true or false,Validates the data against your schema

    expect(valid, JSON.stringify(validateRequestBody.errors, null, 2)).toBe(
      true
    );

    // You can choose to fulfill or continue
    await route.continue();
  });

  // Trigger the request (e.g., form submission or API call)
  await page.goto("https://your-app.com");
  await page.click("button#create-user");
});

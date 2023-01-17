const Validator = require('jsonschema').Validator
const validator = new Validator()
// Formats

// 1. disableFormat
// To disable the format by providing the disableFormat: true in validator option

// 2. string formats
// All formats are supported

// 3. Custom Formats
// We can add our own custom format functions. Format functions accept the input being validated, and return a boolean value
// If the returned value is true, then the validation succeeds and if the returned value is false, then the validation fails

// Validator.prototype.customFormats.myFormat = function (input) {
//   return input === 'myFormat'
// }
// const validator = new Validator()
// validator.validate('myFormat', { type: 'string', format: 'myFormat' }).valid
// validator.validate('foo', { type: 'string', format: 'myFormat' }).valid

validator.attributes.contains = function validateContains (instance, schema, options, ctx) {
  if (typeof instance !== 'string') return
  if (typeof schema.contains !== 'string') throw new jsonschema.SchemaError('"contains" expects a string', schema)
  if (instance.indexOf(schema.contains) < 0) {
    return 'does not contain the string ' + JSON.stringify(schema.contains)
  }
}
const result = validator.validate('I am an instance', { type: 'string', contains: 'I am' })
console.log(result)
// result.valid === true;

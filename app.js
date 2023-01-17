const Validator = require('jsonschema').Validator
const v = new Validator()
// const instance = 4

// const schema = { type: 'number' }
// console.log(v.validate(instance, schema))

const addressSchema = {
  id: '/SimpleAddress',
  type: 'object',
  properties: {
    lines: {
      type: 'array',
      items: { type: 'string' }
    },
    zip: { type: 'string' },
    city: { type: 'string' },
    country: { type: 'string' }
  },
  required: ['country']
}

// Person
const schema = {
  id: '/SimplePerson',
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { $ref: '/SimpleAddress' },
    votes: { type: 'integer', minimum: 1 }
  }
}

const p = {
  name: 'Barack Obama',
  address: {
    lines: ['1600 Pennsylvania Avenue Northwest'],
    zip: 'DC 20500',
    city: 'Washington',
    country: 'USA'
  },
  votes: 'lots'
}

v.addSchema(addressSchema, '/SimpleAddress')
console.log(v.validate(p, schema))

// const res = validate(undefined, { type: 'string' })
// res.valid

// const schema1 = {
//   oneOf: [
//     { type: 'string', minLength: 32, maxLength: 32 },
//     { type: 'string', maxLength: 16 },
//     { type: 'number' }
//   ]
// }
// const validator = new Validator()
// const result = validator.validate('This string is 28 chars long afdnapfnu', schema1, { nestedErrors: true })
// console.log(result)

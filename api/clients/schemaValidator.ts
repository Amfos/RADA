import Ajv from 'ajv';

export class SchemaValidator {
  ajv;
  obj;
  schema;
  constructor(obj: JSON, schema: any) {
    this.ajv = new Ajv({ allErrors: true });
    this.obj = obj;
    this.schema = schema;
  }

  async validate(obj: JSON, schema: any) {
    const validate = this.ajv.compile(schema);
    const valid = validate(obj);
    if (!valid) {
      if (!validate.errors) {
        throw new Error('Error Validation');
      }
      throw new Error(JSON.stringify(validate.errors));
    }
    return valid;
  }
}

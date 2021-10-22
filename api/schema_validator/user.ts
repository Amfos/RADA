import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv({ allErrors: true });

interface UserData {
  name: string;
  job: string;
  id: string;
  createdAt?: string;
  hobbies: string[];
}

const schema: JSONSchemaType<UserData> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    id: { type: 'string' },
    createdAt: { type: 'string', nullable: true },
    hobbies: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'job', 'id', 'hobbies'],
  additionalProperties: true,
};

export function validate(obj: any) {
  const validate = ajv.compile(schema);
  const valid = validate(obj);
  if (!valid) {
    console.log(validate.errors);
  }
  return valid;
}

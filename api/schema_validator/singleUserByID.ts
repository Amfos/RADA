import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv({ allErrors: true });

interface UserByID {
  data: {
    id: number;
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}

const schema: JSONSchemaType<UserByID> = {
  type: 'object',
  required: ['data', 'support'],
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        avatar: { type: 'string' },
        password: { type: 'string', nullable: true },
      },
      additionalProperties: true,
      required: ['email', 'id'],
    },
    support: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        text: { type: 'string' },
      },
      additionalProperties: true,
      required: [],
    },
  },
};

export function validateUserByID(obj: any) {
  const validate = ajv.compile(schema);
  const valid = validate(obj);
  if (!valid) {
    console.log(validate.errors);
  }
  return valid;
}

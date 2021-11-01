export const singleUserByID = {
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

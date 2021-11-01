export const user = {
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

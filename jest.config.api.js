const config = require('./jest.config');

module.exports = {
  ...config,
  testMatch: ['**/api/specs/*.spec.ts'],
  testTimeout: 300_000,
};

const config = require('./jest.config');

module.exports = {
  ...config,
  testMatch: ['**/ui/specs/*.spec.ts'],
  testTimeout: 300_000,
};

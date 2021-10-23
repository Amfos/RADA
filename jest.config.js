module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/*.spec.ts'],
  setupFilesAfterEnv: ['jest-extended', 'jest-expect-message'],
  verbose: true,
  testTimeout: 280_000,
};

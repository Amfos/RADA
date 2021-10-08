// module.exports = {
//   verbose: true,
//   testTimeout: 60_000,
//   setupFilesAfterEnv: ['jest-extended'],
// };

const { defaults } = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
  testTimeout: 60_000,
  setupFilesAfterEnv: ['jest-extended'],
};

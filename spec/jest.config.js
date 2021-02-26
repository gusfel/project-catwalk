module.exports = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: { enzymeAdapter: 'react16' },
  transform: {
    '^.+\\.jsx$': 'babel-jest',
  },
  clearMocks: 'true',
};

module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  setupFiles: [
    "react-app-polyfill/jsdom"
  ],
  setupFilesAfterEnv: [
    './tests/setup.js',
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  testEnvironment: "jest-environment-jsdom-fourteen",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  modulePaths: [],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    '^.+\\.(css)$': 'identity-obj-proxy',
    '^.+\\.(png|jpg|jpeg|svg|txt|ico)$': '<rootDir>/tests/empty-module.js',
    '^_modules/(.*)': '<rootDir>/src/modules/$1',
    '^_components/(.*)': '<rootDir>/src/components/$1',
    '^_config/(.*)': '<rootDir>/src/config/$1',
    '^_services/(.*)': '<rootDir>/src/services/$1',
    '^_models/(.*)': '<rootDir>/src/models/$1',
    '^_models': '<rootDir>/src/models',
    '^_views/(.*)': '<rootDir>/src/views/$1',
    '^_utils/(.*)': '<rootDir>/src/utils/$1',
    '^_styles/(.*)': '<rootDir>/src/styles/$1',
    '^_store/(.*)': '<rootDir>/src/store/$1',
    '^_hocs/(.*)': '<rootDir>/src/hocs/$1',
    '^_hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^_middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '^_assets/(.*)': '<rootDir>/src/assets/$1',
    '\\.worker.js': '<rootDir>/tests/__mocks__/workerMock.js',
    '^_privateDependencies/(.*)': '<rootDir>/private-dependencies/$1',
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  testPathIgnorePatterns: [
    './private-dependencies',
    '<rootDir>[/\\\\](dist|dist-server|node_modules|.storybook)[/\\\\]',
  ],
  verbose: true,
}

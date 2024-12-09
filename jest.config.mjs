export default {
  transform: {
    "^.+\\.m?js$": ["babel-jest", { configFile: "./babel.config.mjs" }],
  },
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  moduleFileExtensions: ["js", "mjs"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

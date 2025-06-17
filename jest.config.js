/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["<rootDir>/src", "<rootDir>/lib"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "lib/**/*.ts",
    "!**/*.d.ts"
  ],
  coverageReporters: ["text", "lcov"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ]
};
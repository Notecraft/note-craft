module.exports = {
    projects: [{
        displayName: "client tests",
        testMatch: ["<rootDir>/tests/client/**/*.js"],
        transform: {
            "^.+\\.js$": "babel-jest",
        },
        testEnvironment: 'jsdom',
    }, {
        displayName: "server tests",
        testMatch: ["<rootDir>/tests/server/**/*.ts"],
        transform: {
            '^.+\\.ts?$': 'ts-jest'
        },
        testEnvironment: 'node'
    }],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 33,
            functions: 55,
            lines: 65,
            statements: 67
        }
    },
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules'
    ],
    globals: {
        'NODE_ENV': 'test',
    },
}
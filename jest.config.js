module.exports = {
    transform: {
        '^.+\\.js$': ['babel-jest'],
        '^.+\\.svg$': '<rootDir>/svgTransform.js'
    },
    setupFiles: [
        '<rootDir>/src/setupTests.js'
    ],
    roots: [
        '<rootDir>',
        '<rootDir>/src'
    ],
    modulePaths: [
        '<rootDir>',
        '<rootDir>/src',
    ],
    modulePathIgnorePatterns: [
        //**/*.test.js/
    ],
    moduleDirectories: [
        'node_modules'
    ]
}

console.log('loaded jest.config.js');
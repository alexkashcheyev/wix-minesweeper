console.log('jest.config.js');

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
    moduleDirectories: [
        'node_modules'
    ],
}
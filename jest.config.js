module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coveragePathIgnorePatterns: ['src/mocks'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    /* setupFiles: ['./jest.polyfills.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], */
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    moduleNameMapper: {
        "\\.(css|sass|png)$": "identity-obj-proxy",
    }/* ,
    globals: {
        fetch,
        Headers,
        Request,
        Response,
        FormData,
        Blob,
    } */
};
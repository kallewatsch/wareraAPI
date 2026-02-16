module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coveragePathIgnorePatterns: ['src/mocks'],
    coverageDirectory: 'coverage',
    //testEnvironment: 'jsdom',
    testEnvironment: 'jest-fixed-jsdom',
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    transformIgnorePatterns: ['/node_modules/(?!until-async)'],
    //setupFiles: ['./jest.polyfills.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/mocks/fileMock.js",
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
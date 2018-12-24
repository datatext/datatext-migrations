module.exports = {
    "roots": [
        "<rootDir>/tests"
    ],
    "transform": {
        "^.+\\.ts?$": "ts-jest"
    },
    "testRegex": "/tests/integration/.*.ts$",
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        "node"
    ],
    "testRunner": "jest-circus/runner"
};

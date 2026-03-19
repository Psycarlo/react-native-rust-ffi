"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withAndroid_1 = require("./withAndroid");
const withIOS_1 = require("./withIOS");
const pkg = require('../../package.json');
const withReactNative = (config, props = {}) => {
    const { skipBinaryDownload = false } = props || {};
    return (0, config_plugins_1.withPlugins)(config, [
        [withAndroid_1.withAndroid, { skipBinaryDownload }],
        [withIOS_1.withIOS, { skipBinaryDownload }],
    ]);
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withReactNative, pkg.name, pkg.version);

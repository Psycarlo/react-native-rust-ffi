"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroid = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withGradlePropertiesConfig = (config) => {
    return (0, config_plugins_1.withGradleProperties)(config, (config) => {
        config.modResults = config.modResults.filter((item) => item.type !== 'property' || item.key !== 'android.useAndroidX');
        config.modResults.push({
            type: 'property',
            key: 'android.useAndroidX',
            value: 'true',
        });
        return config;
    });
};
const withAndroid = (config) => {
    config = withGradlePropertiesConfig(config);
    return config;
};
exports.withAndroid = withAndroid;

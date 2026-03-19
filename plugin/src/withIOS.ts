import { type ConfigPlugin } from '@expo/config-plugins';

export const withIOS: ConfigPlugin = (config) => {
  // Currently no additional iOS configuration needed
  return config;
};
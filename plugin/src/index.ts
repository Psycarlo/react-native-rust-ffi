import type { ConfigPlugin } from '@expo/config-plugins';
import { createRunOncePlugin, withPlugins } from '@expo/config-plugins';
import { withAndroid } from './withAndroid';
import { withIOS } from './withIOS';

const pkg = require('../../package.json');

export interface RustFfiPluginProps {
  skipBinaryDownload?: boolean;
}

const withReactNative: ConfigPlugin<RustFfiPluginProps | void> = (config, props = {}) => {
  const { skipBinaryDownload = false } = props || {};

  return withPlugins(config, [
    [withAndroid, { skipBinaryDownload }],
    [withIOS, { skipBinaryDownload }],
  ]);
};

export default createRunOncePlugin(withReactNative, pkg.name, pkg.version);

// @flow

import type { PluginConfig } from './types';

const pluginConfigs: Array<PluginConfig> = [
  {
    baseUrl: 'https://unpkg.com',
    label: 'Minify (Babili)',
    package: 'babili-standalone',
    version: '0'
  },
  {
    label: 'Prettify',
    package: 'prettier',
    version: '1'
  }
];

const presetPluginConfigs: Array<PluginConfig> = [
  /* TODO Add support for preset-env
  {
    label: 'env',
    package: 'babel-preset-env',
    version: '1'
  },
  */
  {
    label: 'es2015',
    package: 'babel-preset-es2015',
    isPreLoaded: true
  },
  {
    label: 'es2015-loose',
    package: 'babel-preset-es2015-loose',
    isPreLoaded: true
  },
  {
    label: 'es2016',
    package: 'babel-preset-es2016',
    isPreLoaded: true
  },
  {
    label: 'es2017',
    package: 'babel-preset-es2017',
    isPreLoaded: true
  },
  {
    label: 'react',
    package: 'babel-preset-react',
    isPreLoaded: true
  },
  {
    label: 'stage-0',
    package: 'babel-preset-stage-0',
    isPreLoaded: true
  },
  {
    label: 'stage-1',
    package: 'babel-preset-stage-1',
    isPreLoaded: true
  },
  {
    label: 'stage-2',
    package: 'babel-preset-stage-2',
    isPreLoaded: true
  },
  {
    label: 'stage-3',
    package: 'babel-preset-stage-3',
    isPreLoaded: true
  }
];

export { pluginConfigs, presetPluginConfigs };

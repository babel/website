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
    version: '6'
  },
  {
    label: 'es2015-loose',
    package: 'babel-preset-es2015-loose',
    version: '7'
  },
  {
    label: 'es2016',
    package: 'babel-preset-es2016',
    version: '6'
  },
  {
    label: 'es2017',
    package: 'babel-preset-es2017',
    version: '6'
  },
  {
    label: 'react',
    package: 'babel-preset-react',
    version: '6'
  },
  {
    label: 'stage-0',
    package: 'babel-preset-stage-0',
    version: '6'
  },
  {
    label: 'stage-1',
    package: 'babel-preset-stage-1',
    version: '6'
  },
  {
    label: 'stage-2',
    package: 'babel-preset-stage-2',
    version: '6'
  },
  {
    label: 'stage-3',
    package: 'babel-preset-stage-3',
    version: '6'
  }
];

export { pluginConfigs, presetPluginConfigs };

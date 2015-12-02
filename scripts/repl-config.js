import es2015 from 'babel-preset-es2015';
import react from 'babel-preset-react';
import stage0 from 'babel-preset-stage-0';
import stage1 from 'babel-preset-stage-1';
import stage2 from 'babel-preset-stage-2';
import stage3 from 'babel-preset-stage-3';

export const presets = {
  es2015,
  react,
  'stage-0': stage0,
  'stage-1': stage1,
  'stage-2': stage2,
  'stage-3': stage3,
};

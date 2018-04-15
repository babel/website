const sizes = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB"];

const prettySize = (size: number) => {
  const places = 1;
  let mysize;

  sizes.forEach((unit, id) => {
    const s = Math.pow(1024, id);
    let fixed;
    if (size >= s) {
      fixed = String((size / s).toFixed(places));
      if (fixed.indexOf(".0") === fixed.length - 2) {
        fixed = fixed.slice(0, -2);
      }
      mysize = `${fixed} ${unit}`;
    }
  });

  // zero handling
  // always prints in Bytes
  if (!mysize) {
    const unit = sizes[0];
    mysize = `0 ${unit}`;
  }
  return mysize;
};

export const getCodeSize = (code: string) => {
  return prettySize(new Blob([code], { type: "text/plain" }).size);
};

export const getEnvPresetOptions = ({
  browsers,
  builtIns,
  forceAllTransforms,
  isBuiltInsEnabled,
  isElectronEnabled,
  isNodeEnabled,
  node,
  shippedProposals,
}: EnvConfig) => {
  let useBuiltIns = false;

  const targets = {};

  if (browsers) {
    targets.browsers = browsers
      .split(",")
      .map(x => x.trim())
      .filter(x => x);
  }

  if (isElectronEnabled) {
    targets.electron = isElectronEnabled;
  }

  if (isNodeEnabled) {
    targets.node = node;
  }

  if (isBuiltInsEnabled) {
    useBuiltIns = builtIns;
  }

  return {
    targets,
    forceAllTransforms,
    shippedProposals,
    useBuiltIns,
  };
};

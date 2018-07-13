// @flow

const sizes = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB"];

export function prettySize(size: number) {
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
}

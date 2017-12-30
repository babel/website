const sizes = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB"];
export function prettySize(
  size: number,
  nospace: boolean,
  one: boolean,
  places: number
) {
  if (typeof nospace === "object") {
    const opts = nospace;
    nospace = opts.nospace;
    one = opts.one;
    places = opts.places || 1;
  } else {
    places = places || 1;
  }

  let mysize;

  sizes.forEach((unit, id) => {
    if (one) {
      unit = unit.slice(0, 1);
    }
    const s = Math.pow(1024, id);
    let fixed;
    if (size >= s) {
      fixed = String((size / s).toFixed(places));
      if (fixed.indexOf(".0") === fixed.length - 2) {
        fixed = fixed.slice(0, -2);
      }
      mysize = fixed + (nospace ? "" : " ") + unit;
    }
  });

  // zero handling
  // always prints in Bytes
  if (!mysize) {
    const unit = one ? sizes[0].slice(0, 1) : sizes[0];
    mysize = "0" + (nospace ? "" : " ") + unit;
  }

  return mysize;
}

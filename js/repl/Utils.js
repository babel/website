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

export function joinListEnglish(list: string[]): string {
  if (list.length === 0) return "";
  if (list.length === 1) return list[0];
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
}

export function preferDarkColorScheme(): boolean {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme:dark)").matches
  );
}

export function compareVersions(a: string, b: string): 1 | 0 | -1 {
  const aParts = a.split(".");
  const bParts = b.split(".");

  for (let i = 0; i < 3; i++) {
    if (+aParts[i] > +bParts[i]) return 1;
    if (+aParts[i] < +bParts[i]) return -1;
  }
  return 0;
}

// Values logged by the evaluated code come from the sandbox iframe, so they
// belong to another realm: `instanceof` checks against this window's
// constructors would fail. Rely on realm-independent checks instead.

const MAX_DEPTH = 2;
const MAX_ITEMS = 100;

const IDENTIFIER_RE = /^[A-Za-z_$][\w$]*$/;

const getTag = (value: object) => Object.prototype.toString.call(value);

function getConstructorName(value: object): string {
  try {
    const name = Object.getPrototypeOf(value)?.constructor?.name;
    return typeof name === "string" ? name : "";
  } catch {
    return "";
  }
}

function formatKey(key: string): string {
  return IDENTIFIER_RE.test(key) ? key : JSON.stringify(key);
}

function formatFunction(fn: (...args: unknown[]) => unknown): string {
  let isClass = false;
  try {
    isClass = Function.prototype.toString.call(fn).startsWith("class");
  } catch {
    // Some exotic functions (e.g. revoked proxies) can't be stringified.
  }
  if (isClass) return fn.name ? `[class ${fn.name}]` : "[class (anonymous)]";
  return fn.name ? `[Function: ${fn.name}]` : "[Function (anonymous)]";
}

function formatError(error: { name?: unknown; message?: unknown }): string {
  const name = String(error.name ?? "Error");
  const message = String(error.message ?? "");
  return message ? `${name}: ${message}` : name;
}

function formatProperty(
  object: object,
  key: string,
  depth: number,
  seen: Set<object>
): string {
  const descriptor = Object.getOwnPropertyDescriptor(object, key);
  // Don't run getters: they could have side effects, or even log the object
  // being formatted again.
  if (descriptor?.get) return descriptor.set ? "[Getter/Setter]" : "[Getter]";
  if (descriptor?.set) return "[Setter]";
  return inspect(descriptor?.value, depth, seen);
}

function formatEntries(
  open: string,
  close: string,
  items: string[],
  total: number
): string {
  if (total > items.length) {
    items.push(`... ${total - items.length} more items`);
  }
  return items.length ? `${open} ${items.join(", ")} ${close}` : open + close;
}

function formatObject(value: object, depth: number, seen: Set<object>) {
  if (seen.has(value)) return "[Circular]";

  const tag = getTag(value);

  switch (tag) {
    case "[object Error]":
    case "[object DOMException]":
      return depth === 0 ? formatError(value) : `[${formatError(value)}]`;
    case "[object Date]": {
      const time = (value as Date).getTime();
      return Number.isNaN(time) ? "Invalid Date" : new Date(time).toISOString();
    }
    case "[object RegExp]":
      return String(value);
    case "[object Symbol]":
    case "[object Number]":
    case "[object String]":
    case "[object Boolean]":
    case "[object BigInt]":
      return `[${getConstructorName(value) || "Object"}: ${inspect(
        value.valueOf(),
        depth + 1,
        seen
      )}]`;
  }

  const isArray =
    Array.isArray(value) ||
    // Typed arrays
    (ArrayBuffer.isView(value) && tag !== "[object DataView]");
  const name = getConstructorName(value);

  if (depth > MAX_DEPTH) {
    return isArray ? "[Array]" : `[${name || "Object"}]`;
  }

  seen.add(value);
  try {
    if (isArray) {
      const array = value as ArrayLike<unknown>;
      const items = [];
      for (let i = 0; i < Math.min(array.length, MAX_ITEMS); i++) {
        items.push(inspect(array[i], depth + 1, seen));
      }
      const prefix =
        name && name !== "Array" ? `${name}(${array.length}) ` : "";
      return prefix + formatEntries("[", "]", items, array.length);
    }

    if (tag === "[object Map]") {
      const map = value as Map<unknown, unknown>;
      const items = [];
      for (const [key, item] of map) {
        if (items.length === MAX_ITEMS) break;
        items.push(
          `${inspect(key, depth + 1, seen)} => ${inspect(item, depth + 1, seen)}`
        );
      }
      return `${name || "Map"}(${map.size}) ${formatEntries("{", "}", items, map.size)}`;
    }

    if (tag === "[object Set]") {
      const set = value as Set<unknown>;
      const items = [];
      for (const item of set) {
        if (items.length === MAX_ITEMS) break;
        items.push(inspect(item, depth + 1, seen));
      }
      return `${name || "Set"}(${set.size}) ${formatEntries("{", "}", items, set.size)}`;
    }

    const keys = Object.keys(value);
    const items = [];
    for (const key of keys.slice(0, MAX_ITEMS)) {
      items.push(
        `${formatKey(key)}: ${formatProperty(value, key, depth + 1, seen)}`
      );
    }
    const prefix = name && name !== "Object" ? `${name} ` : "";
    return prefix + formatEntries("{", "}", items, keys.length);
  } finally {
    seen.delete(value);
  }
}

/**
 * Converts any value to a human-readable string, similarly to how browser
 * consoles and Node.js's `util.inspect` display them.
 */
function inspect(
  value: unknown,
  depth = 0,
  seen: Set<object> = new Set()
): string {
  switch (typeof value) {
    case "string":
      return depth === 0 ? value : JSON.stringify(value);
    case "number":
      return Object.is(value, -0) ? "-0" : String(value);
    case "bigint":
      return `${value}n`;
    case "symbol":
      return value.toString();
    case "function":
      return formatFunction(value as (...args: unknown[]) => unknown);
    case "object":
      return value === null ? "null" : formatObject(value, depth, seen);
    default:
      return String(value);
  }
}

/**
 * Formats the arguments of a `console` method call into a single line,
 * applying printf-style substitutions (`%s`, `%d`, `%i`, `%f`, `%o`, `%O`,
 * `%c` and `%%`) when the first argument is a string.
 */
export default function formatConsoleArgs(args: readonly unknown[]): string {
  const parts: string[] = [];
  let rest = args;

  if (typeof args[0] === "string") {
    let index = 1;
    parts.push(
      args[0].replace(/%([sdifoOc%])/g, (match, specifier: string) => {
        if (specifier === "%") return "%";
        if (index >= args.length) return match;
        const arg = args[index++];
        switch (specifier) {
          case "s":
            return inspect(arg);
          case "d":
          case "i":
            return typeof arg === "symbol"
              ? "NaN"
              : String(Math.trunc(Number(arg)));
          case "f":
            return typeof arg === "symbol" ? "NaN" : String(Number(arg));
          case "o":
          case "O":
            return typeof arg === "string" ? JSON.stringify(arg) : inspect(arg);
          case "c":
            // CSS styles can't be applied to the plain text output.
            return "";
        }
      })
    );
    rest = args.slice(index);
  }

  for (const arg of rest) {
    parts.push(inspect(arg));
  }

  return parts.join(" ");
}

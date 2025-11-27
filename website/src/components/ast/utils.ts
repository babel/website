import type { ParentNodeType } from "./types";

export const objType = (obj: unknown): string =>
  typeof obj === "object" &&
  obj &&
  Symbol.iterator in obj &&
  typeof obj[Symbol.iterator] === "function"
    ? "Iterable"
    : Object.prototype.toString.call(obj).slice(8, -1);

export function isRecord(value: unknown): value is Record<string, unknown> {
  return objType(value) === "Object";
}

export function isNode(value: object): boolean {
  return "type" in value && "loc" in value;
}

export function getNodeType(value: unknown): ParentNodeType {
  if (Boolean(value) && isRecord(value)) {
    if (isNode(value)) {
      return "node";
    }
  }
  return undefined;
}

export function ucFirst(value: string): string {
  if (value.length > 0) {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  }
  return value;
}

export function getTypeName(
  value: Record<string, unknown>,
  valueType: ParentNodeType
): string | undefined {
  switch (valueType) {
    case "node":
      return String(value.type);
  }
  return undefined;
}

function getValidRange(node: {
  start: number;
  end: number;
}): [number, number] | undefined {
  if (typeof node.start === "number" && typeof node.end === "number") {
    return [node.start, node.end];
  }
  return undefined;
}

export function getRange(
  value: unknown,
  valueType?: ParentNodeType
): [number, number] | undefined {
  if (Boolean(value) && isRecord(value)) {
    switch (valueType) {
      case "node":
        return getValidRange(value as any);
    }
  }
  return undefined;
}

export function filterProperties(
  key: string,
  value: unknown,
  type: ParentNodeType,
  showTokens?: boolean
): boolean {
  if (
    value === undefined ||
    typeof value === "function" ||
    key.startsWith("_")
  ) {
    return false;
  }

  switch (type) {
    case "node": {
      return key !== "tokens" || !!showTokens;
    }
  }

  return true;
}

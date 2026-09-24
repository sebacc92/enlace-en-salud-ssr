export function getPath(obj: any, path: string): any {
  return path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), obj);
}

export function setPath(obj: any, path: string, value: any): void {
  const keys = path.split(".");
  let target = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (target[key] == null || typeof target[key] !== "object") target[key] = {};
    target = target[key];
  }
  target[keys[keys.length - 1]] = value;
}

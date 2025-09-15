export function UpperCase(target: any, key: string) {
  let value: string;
  Object.defineProperty(target, key, {
    get: () => value,
    set: (v: string) => value = v?.toUpperCase(),
    enumerable: true,
    configurable: true
  });
}
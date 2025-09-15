export function Required(target: any, key: string) {
  let value: any;
  Object.defineProperty(target, key, {
    get: () => value,
    set: (v: any) => {
      if (v == null) throw new Error(`${key} is required`);
      value = v;
    },
  });
}
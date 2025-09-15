export function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
  let instance: any;
  return class extends constructor {
    constructor(...args: any[]) {
      if (!instance) instance = super(...args);
      return instance;
    }
  }
}
export function Required<T>(target: T, propertyKey: keyof T) {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${String(propertyKey)} is required`);
    },
    set(value: T[typeof propertyKey]) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true,
  });
}

export class CollectionMapper {
  static mapArrayToMap<Key, Value>(
    array: Value[],
    keyGetter: (value: Value) => Key
  ) {
    const map = new Map<Key, Value>();
    array.forEach((value) => map.set(keyGetter(value), value));
    return map;
  }
}

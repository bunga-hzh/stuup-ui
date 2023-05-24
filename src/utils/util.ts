type EnumValue = string | number;

interface DictItem {
  label: string;
  value: EnumValue;
}

interface EnumDefinition {
  [key: string]: [EnumValue, EnumValue];
}

class Enum {
  private strToValueMap: { [key: string]: EnumValue } = {};
  private numToDescMap: { [key: EnumValue]: EnumValue } = {};

  constructor(private definition: EnumDefinition) {
    for (const enumName of Object.keys(definition)) {
      const [value, desc] = definition[enumName];
      this.strToValueMap[enumName] = value;
      this.numToDescMap[value] = desc;
    }
  }

  public getDesc(enumName: string): EnumValue {
    return (this.definition[enumName] && this.definition[enumName][1]) || '';
  }

  public getDescFromValue(value: EnumValue): EnumValue {
    return this.numToDescMap[value] || '';
  }

  public getDict(): DictItem[] {
    return Object.keys(this.definition).map(key => {
      const [value, desc] = this.definition[key];
      return {
        label: desc,
        value: value,
      };
    });
  }

  public *[Symbol.iterator]() {
    for (const key of Object.keys(this.definition)) {
      yield [key, this.strToValueMap[key]];
    }
  }
}

export const createEnum = (definition: EnumDefinition): Enum => {
  return new Enum(definition);
};

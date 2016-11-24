import {getSafeExpressionName, getSafeExpressionValue} from '../utils'; 

export default class SetExpression implements dn.UpdateExpression {
  _valueMap: dn.NameMap = {};
  _nameMap: dn.NameMap = {};
  _fullPathExpressions: string[] = [];

  constructor(item: Object) {
    this._parseItem(item, []);
  }

  private _parseItem(item: Object, safeKeys: string[]) {
    Object.keys(item).forEach(key => {
      const safeKey = getSafeExpressionName();
      this._nameMap[safeKey] = key;
      const value: any = item[key];
      const isArray: boolean = Array.isArray(value);
      const isString: boolean = typeof value === 'string';
      const isBoolean: boolean = typeof value === 'boolean';
      const isNumber: boolean = typeof value === 'number';
      if (isArray || isString || isBoolean || isNumber) {
        const safeValue = getSafeExpressionValue();
        this._valueMap[safeValue] = value;
        const pathExpression = this._getFullPathExpression(safeKeys.concat(safeKey), safeValue);
        this._fullPathExpressions.push(pathExpression);
      } else {
        this._parseItem(value, safeKeys.concat(safeKey));
      }
    });
  }

  private _getFullPathExpression(safeKeys: string[], safeValue: string) {
    return safeKeys.join('.') + ' = ' + safeValue;
  }

  exprString(): string {
    const fullPathExpressions = this._fullPathExpressions.join(', ');
    return 'SET ' + fullPathExpressions;
  }

  nameMap(): dn.NameMap {
    return this._nameMap;
  }

  valueMap(): dn.ValueMap {
    return this._valueMap;
  }
}

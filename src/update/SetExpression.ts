import Dynaflo from '..';
import {UpdateExpression} from './UpdateExpression';
import {getSafeExpressionName, getSafeExpressionValue} from '../utils';

export default class SetExpression implements UpdateExpression {
  _valueMap: Dynaflo.ValueMap = {};
  _nameMap: Dynaflo.NameMap = {};
  _fullPathExpressions: string[] = [];

  constructor(item: Object) {
    this._parseItem(item, []);
  }

  private _parseItem(item: any, safeKeys: string[]) {
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

  nameMap(): Dynaflo.NameMap {
    return this._nameMap;
  }

  valueMap(): Dynaflo.ValueMap {
    return this._valueMap;
  }
}

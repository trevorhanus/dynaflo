import Dynaflo from '..';
import {UpdateExpression} from './UpdateExpression';
import {getSafeExpressionName, getSafeExpressionValue} from '../utils';

export default class DeleteExpression implements UpdateExpression {
  private _safeName: string;
  private _safeValues: string[] = [];
  private _valueMap: Dynaflo.ValueMap = {};
  private _nameMap: Dynaflo.NameMap = {};

  constructor(topLevelAttr: string, itemsToDelete: string[]) {
    this._saveSafeName(topLevelAttr);
    this._saveSafeValues(itemsToDelete);
  }

  private _saveSafeName(topLevelAttr: string) {
    const safeName = getSafeExpressionName();
    this._safeName = safeName;
    this._nameMap[safeName] = topLevelAttr;
  }

  private _saveSafeValues(itemsToDelete: string[]) {
    itemsToDelete.forEach(value => {
      const safeValue = getSafeExpressionValue();
      this._valueMap[safeValue] = value;
      this._safeValues.push(safeValue);
    });
  }

  exprString() {
    return 'DELETE ' + this._safeName + ' ' + this._safeValues.join(', ');
  }

  nameMap(): Dynaflo.NameMap {
    return this._nameMap;
  }

  valueMap(): Dynaflo.ValueMap {
    return this._valueMap;
  }
}

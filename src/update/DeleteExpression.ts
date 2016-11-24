import {getSafeExpressionName, getSafeExpressionValue} from '../utils';

export default class DeleteExpression implements dn.UpdateExpression {
  _safeName: string;
  _safeValues: string[] = [];
  _valueMap: dn.ValueMap = {};
  _nameMap: dn.NameMap = {};

  constructor(topLevelAttr: string, itemsToDelete: string[]) {
    this._saveSafeName(topLevelAttr);
    this._saveSafeValues(itemsToDelete);
  }

  _saveSafeName(topLevelAttr: string) {
    const safeName = getSafeExpressionName();
    this._safeName = safeName;
    this._nameMap[safeName] = topLevelAttr;
  }

  _saveSafeValues(itemsToDelete: string[]) {
    itemsToDelete.forEach(value => {
      const safeValue = getSafeExpressionValue();
      this._valueMap[safeValue] = value;
      this._safeValues.push(safeValue);
    });
  }

  exprString() {
    return 'DELETE ' + this._safeName + ' ' + this._safeValues.join(', ');
  }

  nameMap(): dn.NameMap {
    return this._nameMap;
  }

  valueMap() {
    return this._valueMap;
  }
}

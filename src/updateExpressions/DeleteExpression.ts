import {Expression, ValueMap, NameMap} from '../interfaces';
import {getSafeExpressionName, getSafeExpressionValue} from '../utils';

export default class DeleteExpression implements Expression {
  private safeName: string;
  private safeValues: string[] = [];
  private _valueMap: ValueMap = {};
  private _nameMap: NameMap = {};

  constructor(topLevelAttr: string, itemsToDelete: string[]) {
    this.saveSafeName(topLevelAttr);
    this.saveSafeValues(itemsToDelete);
  }

  private saveSafeName(topLevelAttr: string) {
    const safeName = getSafeExpressionName();
    this.safeName = safeName;
    this._nameMap[safeName] = topLevelAttr;
  }

  private saveSafeValues(itemsToDelete: string[]) {
    itemsToDelete.forEach(value => {
      const safeValue = getSafeExpressionValue();
      this._valueMap[safeValue] = value;
      this.safeValues.push(safeValue);
    });
  }

  exprString() {
    return 'DELETE ' + this.safeName + ' ' + this.safeValues.join(', ');
  }

  nameMap(): NameMap {
    return this._nameMap;
  }

  valueMap(): ValueMap {
    return this._valueMap;
  }
}

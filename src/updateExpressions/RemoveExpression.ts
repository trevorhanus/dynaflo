import {getSafeExpressionName, getSafeExpressionValue} from '../utils';
import {NameMap, ValueMap, Expression} from '../interfaces';
import NestedAttribute from '../utils/NestedAttribute';
import {assign as _assign} from 'lodash';
import {concat as _concat} from 'lodash';

export default class RemoveExpression implements Expression {
  _safePaths: string[] = [];
  _nameMap: NameMap = {};

  constructor(attributes: (string | Object)[]) {
    attributes.forEach(attr => {
      if (typeof attr === 'string') {
        this.saveStringAttr(attr);
      } else {
        this.saveNestedObject(attr);
      }
    });
  }

  saveStringAttr(attr: string) {
    const safeName = getSafeExpressionName();
    this._safePaths.push(safeName);
    this._nameMap[safeName] = attr;
  }

  saveNestedObject(attr: Object) {
    const nestedAttr = new NestedAttribute(attr);
    _assign(this._nameMap, nestedAttr.nameMap());
    this._safePaths = _concat(this._safePaths, nestedAttr.joinedSafePaths());
  }

  exprString() {
    return 'REMOVE ' + this._safePaths.join(', ');
  }

  nameMap(): NameMap {
    return this._nameMap;
  }

  valueMap() {
    const noValues = {};
    return noValues;
  }
}

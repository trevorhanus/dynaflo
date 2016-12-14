import Dynaflo from '..';
import {getSafeExpressionName, getSafeExpressionValue} from '../utils';
import {UpdateExpression} from './UpdateExpression';
import NestedAttribute from '../utils/NestedAttribute';
import {assign as _assign} from 'lodash';
import {concat as _concat} from 'lodash';

export default class RemoveExpression implements UpdateExpression {
  _safePaths: string[] = [];
  _nameMap: Dynaflo.NameMap = {};

  constructor(attributes: (string | Object)[]) {
    attributes.forEach(attr => {
      if (typeof attr === 'string') {
        this._saveStringAttr(attr);
      } else {
        this._saveNestedObject(attr);
      }
    });
  }

  _saveStringAttr(attr: string) {
    const safeName = getSafeExpressionName();
    this._safePaths.push(safeName);
    this._nameMap[safeName] = attr;
  }

  _saveNestedObject(attr: Object) {
    const nestedAttr = new NestedAttribute(attr);
    _assign(this._nameMap, nestedAttr.nameMap());
    this._safePaths = _concat(this._safePaths, nestedAttr.joinedSafePaths());
  }

  exprString() {
    return 'REMOVE ' + this._safePaths.join(', ');
  }

  nameMap(): Dynaflo.NameMap {
    return this._nameMap;
  }

  valueMap() {
    const noValues = {};
    return noValues;
  }
}

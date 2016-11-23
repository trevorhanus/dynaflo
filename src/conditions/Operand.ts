import {getSafeExpressionValue} from '../utils';
import Condition from './Condition';
import Attribute from './Attribute';

export default class Operand {
  private safeValue: string;
  private attribute: Attribute;
  _valueMap: dn.ValueMap;

  constructor(value: (number | boolean | string | Condition)) {
    if (value instanceof Condition) {
      this.attribute = value.attribute;
    } else {
      this.safeValue = getSafeExpressionValue();
      this._valueMap = {};
      this._valueMap[this.safeValue] = value;
    }
  }

  exprString(): string {
    if (this.attribute) {
      return this.attribute.safePath();
    } else {
      return this.safeValue;
    }
  }

  valueMap(): dn.ValueMap {
    return this._valueMap;
  }
}

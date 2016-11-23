import {getSafeExpressionValue} from '../utils';
import Condition from './Condition';
import Attribute from './Attribute';

export default class Operand {
  private safeValue: string;
  private attribute: Attribute;
  valueMap: Object;

  constructor(value: (number | boolean | string | Condition)) {
    if (value instanceof Condition) {
      this.attribute = value.attribute;
    } else {
      this.safeValue = getSafeExpressionValue();
      this.valueMap = {};
      this.valueMap[this.safeValue] = value;
    }
  }

  str(): string {
    if (this.attribute) {
      return this.attribute.safePath;
    } else {
      return this.safeValue;
    }
  }
}

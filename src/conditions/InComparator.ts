import Comparator from './Comparator';
import Operand from './Operand';
import Condition from './Condition';
import {assign as _assign} from 'lodash';

export default class InComparator extends Comparator {
  operands: Operand[] = [];

  constructor(operands: (string | boolean | number | Condition)[]) {
    super(null);
    operands.forEach(operand => {
      this.operands.push(new Operand(operand));
    });
  }

  valueMap() {
    let map = {};
    this.operands.forEach(operand => {
      _assign(map, operand.valueMap);
    });
    return map;
  }

  string(safePath: string): string {
    return safePath + ' IN ' + this._joinOperands();
  }

  private _joinOperands() {
    let strings: string[] = [];
    this.operands.forEach(operand => {
      strings.push(operand.string());
    });
    return strings.join(', ');
  }
}

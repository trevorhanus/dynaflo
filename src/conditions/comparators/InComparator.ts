import Dynaflo from '../..';
import {ValueMap} from '../../interfaces';
import {Comparator} from './Comparator';
import Operand from '../Operand';
import Condition from '../Condition';
import {assign as _assign} from 'lodash';

export default class InComparator implements Comparator {
  operands: Operand[] = [];

  constructor(operands: (string | boolean | number | Condition)[]) {
    operands.forEach(operand => {
      this.operands.push(new Operand(operand));
    });
  }

  valueMap(): ValueMap {
    let map = {};
    this.operands.forEach(operand => {
      _assign(map, operand.valueMap);
    });
    return map;
  }

  exprString(safePath: string): string {
    return safePath + ' IN ' + this._joinOperands();
  }

  private _joinOperands() {
    let strings: string[] = [];
    this.operands.forEach(operand => {
      strings.push(operand.exprString());
    });
    return strings.join(', ');
  }
}

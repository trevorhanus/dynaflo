import Operand from '../Operand';
import {assign as _assign} from 'lodash';

export default class BetweenComparator implements f.Comparator {
  lowOperand: Operand;
  highOperand: Operand;

  constructor(lowOperand: (number | string), highOperand: (number | string)) {
    this.lowOperand = new Operand(lowOperand);
    this.highOperand = new Operand(highOperand);
  }

  valueMap(): f.ValueMap {
    let map = {};
    _assign(map, this.lowOperand.valueMap());
    _assign(map, this.highOperand.valueMap());
    return map;
  }

  exprString(safePath: string): string {
    return safePath + ' BETWEEN ' + this.lowOperand.exprString() + ' AND ' + this.highOperand.exprString();
  }
}

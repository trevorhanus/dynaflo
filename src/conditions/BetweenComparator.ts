import Comparator from './Comparator';
import Operand from './Operand';
import {assign as _assign} from 'lodash';

export default class BetweenComparator extends Comparator {
  lowOperand: Operand;
  highOperand: Operand;

  constructor(lowOperand: (number | string), highOperand: (number | string)) {
    super();
    this.lowOperand = new Operand(lowOperand);
    this.highOperand = new Operand(highOperand);
  }

  valueMap() {
    let map = {};
    _assign(map, this.lowOperand.valueMap);
    _assign(map, this.highOperand.valueMap);
    return map;
  }

  string(safePath: string): string {
    return safePath + ' BETWEEN ' + this.lowOperand.string() + ' AND ' + this.highOperand.string();
  }
}

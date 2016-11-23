import Operand from './Operand';
import {assign as _assign} from 'lodash';

export default class BetweenComparator implements IComparator {
  lowOperand: Operand;
  highOperand: Operand;

  constructor(lowOperand: (number | string), highOperand: (number | string)) {
    this.lowOperand = new Operand(lowOperand);
    this.highOperand = new Operand(highOperand);
  }

  valueMap() {
    let map = {};
    _assign(map, this.lowOperand.valueMap);
    _assign(map, this.highOperand.valueMap);
    return map;
  }

  str(safePath: string): string {
    return safePath + ' BETWEEN ' + this.lowOperand.str() + ' AND ' + this.highOperand.str();
  }
}

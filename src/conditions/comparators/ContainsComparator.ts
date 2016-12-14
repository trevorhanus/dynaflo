import Dynaflo from '../..';
import {Comparator} from './Comparator';
import Operand from '../Operand';

export default class ContainsComparator implements Comparator {
  operand: Operand; 

  constructor(operand: string) {
    this.operand = new Operand(operand);
  }

  exprString(safePath: string): string {
    return 'contains(' + safePath + ', ' + this.operand.exprString() + ')';
  }

  valueMap(): Dynaflo.ValueMap {
    return this.operand.valueMap();
  }
}

import Dynaflo from '../..';
import {ValueMap} from '../../interfaces';
import {Comparator} from './Comparator';
import Operand from '../Operand';

export default class BeginsWithComparator implements Comparator {
  operand: Operand; 

  constructor(operand: string) {
    this.operand = new Operand(operand);
  }

  exprString(safePath: string): string {
    return 'begins_with(' + safePath + ', ' + this.operand.exprString() + ')';
  }

  valueMap(): ValueMap {
    return this.operand.valueMap();
  }
}

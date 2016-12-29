import Dynaflo from '../..';
import {ValueMap} from '../../expression';
import {Comparator} from './Comparator';
import Operand from '../Operand';

export default class TypeComparator implements Comparator {
  operand: Operand; 

  constructor(type: ('S' | 'SS' | 'N' | 'NS' | 'B' | 'BS' | 'BOOL' | 'NULL' | 'L' | 'M')) {
    this.operand = new Operand(type);
  }

  exprString(safePath: string): string {
    return 'attribute_type(' + safePath + ', ' + this.operand.exprString() + ')';
  }

  valueMap(): ValueMap {
    return this.operand.valueMap();
  }
}

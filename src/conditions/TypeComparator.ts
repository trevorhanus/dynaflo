import Operand from './Operand';

export default class TypeComparator implements IComparator {
  operand: Operand; 

  constructor(type: ('S' | 'SS' | 'N' | 'NS' | 'B' | 'BS' | 'BOOL' | 'NULL' | 'L' | 'M')) {
    this.operand = new Operand(type);
  }

  str(safePath: string): string {
    return 'attribute_type(' + safePath + ', ' + this.operand.str() + ')';
  }

  valueMap(): Object {
    return this.operand.valueMap;
  }
}

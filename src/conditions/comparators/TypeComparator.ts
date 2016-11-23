import Operand from '../Operand';

export default class TypeComparator implements dn.Comparator {
  operand: Operand; 

  constructor(type: ('S' | 'SS' | 'N' | 'NS' | 'B' | 'BS' | 'BOOL' | 'NULL' | 'L' | 'M')) {
    this.operand = new Operand(type);
  }

  exprString(safePath: string): string {
    return 'attribute_type(' + safePath + ', ' + this.operand.exprString() + ')';
  }

  valueMap(): dn.ValueMap {
    return this.operand.valueMap();
  }
}

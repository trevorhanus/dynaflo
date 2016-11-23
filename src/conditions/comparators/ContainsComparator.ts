import Operand from '../Operand';

export default class ContainsComparator implements dn.Comparator {
  operand: Operand; 

  constructor(operand: string) {
    this.operand = new Operand(operand);
  }

  exprString(safePath: string): string {
    return 'contains(' + safePath + ', ' + this.operand.exprString() + ')';
  }

  valueMap(): dn.ValueMap {
    return this.operand.valueMap();
  }
}

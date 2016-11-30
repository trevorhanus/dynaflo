import Operand from '../Operand';

export default class BeginsWithComparator implements f.Comparator {
  operand: Operand; 

  constructor(operand: string) {
    this.operand = new Operand(operand);
  }

  exprString(safePath: string): string {
    return 'begins_with(' + safePath + ', ' + this.operand.exprString() + ')';
  }

  valueMap(): f.ValueMap {
    return this.operand.valueMap();
  }
}

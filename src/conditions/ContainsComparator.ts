import Operand from './Operand';

export default class ContainsComparator implements IComparator {
  operand: Operand; 

  constructor(operand: string) {
    this.operand = new Operand(operand);
  }

  str(safePath: string): string {
    return 'contains(' + safePath + ', ' + this.operand.str() + ')';
  }

  valueMap(): Object {
    return this.operand.valueMap;
  }
}

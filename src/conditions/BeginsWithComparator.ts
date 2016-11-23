import Operand from './Operand';

export default class BeginsWithComparator implements IComparator {
  operand: Operand; 

  constructor(operand: string) {
    this.operand = new Operand(operand);
  }

  str(safePath: string): string {
    return 'begins_with(' + safePath + ', ' + this.operand.str() + ')';
  }

  valueMap(): Object {
    return this.operand.valueMap;
  }
}

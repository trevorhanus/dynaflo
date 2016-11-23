import Operand from './Operand';
import Condition from './Condition';

export default class SymbolComparator implements IComparator {
  operand: Operand;
  symbol: string;

  constructor(symbol: string, operand: (number | boolean | string | Condition)) {
    this.operand = new Operand(operand);
    this.symbol = symbol;
  }

  str(safePath: string): string {
    return safePath + this.symbol + this.operand.str();
  }

  valueMap(): Object {
    return this.operand.valueMap;
  }
}

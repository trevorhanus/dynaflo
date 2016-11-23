import Comparator from './Comparator';
import Condition from './Condition';

export default class SymbolComparator extends Comparator {
  symbol: string;

  constructor(symbol: string, operand: (number | boolean | string | Condition)) {
    super(operand);
    this.symbol = symbol;
  }

  string(safePath: string): string {
    return safePath + this.symbol + this.operand.string();
  }
}

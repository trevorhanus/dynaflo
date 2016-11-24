import Operand from '../Operand';
import Condition from '../Condition';

export default class SymbolComparator implements dn.Comparator {
  operand: Operand;
  symbol: string;

  constructor(symbol: string, operand: (number | boolean | string | Condition)) {
    this.operand = new Operand(operand);
    this.symbol = symbol;
  }

  exprString(safePath: string): string {
    return safePath + this.symbol + this.operand.exprString();
  }

  valueMap(): dn.ValueMap {
    return this.operand.valueMap();
  }
}
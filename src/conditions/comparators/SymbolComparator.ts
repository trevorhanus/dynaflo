import Fluent from '../..';
import {Comparator} from './Comparator';
import Operand from '../Operand';
import Condition from '../Condition';

export default class SymbolComparator implements Comparator {
  operand: Operand;
  symbol: string;

  constructor(symbol: string, operand: (number | boolean | string | Condition)) {
    this.operand = new Operand(operand);
    this.symbol = symbol;
  }

  exprString(safePath: string): string {
    return safePath + this.symbol + this.operand.exprString();
  }

  valueMap(): Fluent.ValueMap {
    return this.operand.valueMap();
  }
}

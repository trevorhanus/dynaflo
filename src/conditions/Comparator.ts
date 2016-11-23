import Condition from './Condition';
import Operand from './Operand';

export default class Comparator {
  operand: Operand;

  constructor(operand?: (number | boolean | string | Condition)) {
    if (operand != null) {
      this.operand = new Operand(operand);
    }
  }
}

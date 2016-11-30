import Attribute from './Attribute';
import {assign as _assign} from 'lodash';
import createEqualsConditionFromAttributeToValueMap from '../utils/createEqualsConditionFromAttributeToValueMap';
import SymbolComparator from './comparators/SymbolComparator';
import ExistsComparator from './comparators/ExistsComparator';
import NotExistsComparator from './comparators/NotExistsComparator';
import TypeComparator from './comparators/TypeComparator';
import ContainsComparator from './comparators/ContainsComparator';
import BeginsWithComparator from './comparators/BeginsWithComparator';
import BetweenComparator from './comparators/BetweenComparator';
import InComparator from './comparators/InComparator';

export default class Condition implements f.Condition {
  attribute: Attribute;
  comparator: f.Comparator;
  andCondition: Condition;
  orCondition: Condition;

  constructor(topLevelOrNestedAttribute: (string | Object)) {
    this.attribute = new Attribute(topLevelOrNestedAttribute);
  }

  nameMap(): f.NameMap {
    const map = {};
    _assign(map, this.attribute.nameMap());
    if (this.andCondition) {
      _assign(map, this.andCondition.nameMap());
    }
    if (this.orCondition) {
      _assign(map, this.orCondition.nameMap());
    }
    return map;
  }

  valueMap(): f.ValueMap {
    const map: f.ValueMap = {};
    if (this.comparator) {
      _assign(map, this.comparator.valueMap());
    }
    if (this.andCondition) {
      _assign(map, this.andCondition.valueMap());
    }
    if (this.orCondition) {
      _assign(map, this.orCondition.valueMap());
    }
    return map;
  }

  or(condition: Condition) {
    this.orCondition = condition;
    return this;
  }

  and(condition: Condition) {
    this.andCondition = condition;
    return this;
  }

  exprString(): string {
    const safePath = this.attribute.safePath();
    const expression = this.comparator.exprString(safePath);
    const andExpression = this.andCondition && this.andCondition.exprString();
    const orExpression = this.orCondition && this.orCondition.exprString();
    return this.concatExpression(expression, andExpression, orExpression);
  }

  concatExpression(expression: string, andExpression: string, orExpression: string): string {
    if (!expression) { throw new ConditionError('Cannot concat an expression without an expression'); }
    if (andExpression && orExpression) {
      return '( ( ' + expression + ' AND ' + andExpression + ' ) OR ' + orExpression + ' )';
    } else if (andExpression) {
      return '( ' + expression + ' AND ' + andExpression + ' )';
    } else if (orExpression) {
      return '( ' + expression + ' ) OR ' + orExpression;
    } else {
      return '( ' + expression + ' )';
    }
  }

  eq(operand: (number | boolean | string)) {
    const symbol = ' = ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  ne(operand: (number | boolean | string)) {
    const symbol = ' <> ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  lt(operand: (number | boolean | string)) {
    const symbol = ' < ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  le(operand: (number | boolean | string)) {
    const symbol = ' <= ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  gt(operand: (number | boolean | string)) {
    const symbol = ' > ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  ge(operand: (number | boolean | string)) {
    const symbol = ' >= ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  between(lowOperand: (number | string), highOperand: (number | string)) {
    this.comparator = new BetweenComparator(lowOperand, highOperand);
    return this;
  }

  in(operands: (string | boolean | number | Condition)[]) {
    this.comparator = new InComparator(operands);
    return this;
  }

  exists() {
    this.comparator = new ExistsComparator();
    return this;
  }

  notExists() {
    this.comparator = new NotExistsComparator();
    return this;
  }

  type(type: ('S' | 'SS' | 'N' | 'NS' | 'B' | 'BS' | 'BOOL' | 'NULL' | 'L' | 'M')) {
    this.comparator = new TypeComparator(type);
    return this;
  }

  contains(operand: string) {
    this.comparator = new ContainsComparator(operand);
    return this;
  }

  beginsWith(substring: string) {
    this.comparator = new BeginsWithComparator(substring);
    return this;
  }

  static fromAttributesToValueMap(attributesToValueMap: Object): Condition {
    return createEqualsConditionFromAttributeToValueMap(attributesToValueMap);
  }
}

export class ConditionError extends Error {}

import Dynaflo from '..';
import Attribute, {AttributeLike} from './Attribute';
import {assign as _assign, concat as _concat} from 'lodash';
import {Expression} from '../expression';
import createEqualsConditionFromAttributeToValueMap from '../utils/createEqualsConditionFromAttributeToValueMap';
import {Comparator} from './comparators/Comparator';
import SymbolComparator from './comparators/SymbolComparator';
import ExistsComparator from './comparators/ExistsComparator';
import NotExistsComparator from './comparators/NotExistsComparator';
import TypeComparator from './comparators/TypeComparator';
import ContainsComparator from './comparators/ContainsComparator';
import BeginsWithComparator from './comparators/BeginsWithComparator';
import BetweenComparator from './comparators/BetweenComparator';
import InComparator from './comparators/InComparator';

export default class Condition implements Expression {
  private attribute: Attribute;
  private comparator: Comparator;
  private andConditions: Condition[] = [];
  private orConditions: Condition[] = [];

  constructor(topLevelOrNestedAttribute: AttributeLike) {
    this.attribute = new Attribute(topLevelOrNestedAttribute);
  }

  nameMap(): Dynaflo.NameMap {
    const map: Dynaflo.NameMap = {};
    _assign(map, this.attribute.nameMap());
    this.andConditions.forEach(condition => {
      _assign(map, condition.nameMap());
    });
    this.orConditions.forEach(condition => {
      _assign(map, condition.nameMap());
    });
    return map;
  }

  valueMap(): Dynaflo.ValueMap {
    const map: Dynaflo.ValueMap = {};
    if (this.comparator) {
      _assign(map, this.comparator.valueMap());
    }
    this.andConditions.forEach(condition => {
      _assign(map, condition.valueMap());
    });
    this.orConditions.forEach(condition => {
      _assign(map, condition.valueMap());
    });
    return map;
  }

  or(...conditions: Condition[]) {
    this.orConditions = _concat(this.orConditions, conditions);
    return this;
  }

  and(...conditions: Condition[]) {
    this.andConditions = _concat(this.andConditions, conditions);
    return this;
  }

  exprString(): string {
    const safePath = this.attribute.safePath();
    const expression = this.comparator.exprString(safePath);
    const andExpression = this.andExpr();
    const orExpression = this.orExpr();
    return this.concatExpression(expression, andExpression, orExpression);
  }

  private andExpr(): string {
    const expressions = this.andConditions.map(condition => {
      return condition.exprString();
    });
    if (expressions.length > 0) {
      return ' AND ' + expressions.join(' AND ');
    } else {
      return '';
    }
  }

  private orExpr(): string {
    const expressions = this.orConditions.map(condition => {
      return condition.exprString();
    });
    if (expressions.length > 0) {
      return ' OR ' + expressions.join(' OR ');
    } else {
      return '';
    }
  }

  private concatExpression(expression: string, andExpression: string, orExpression: string): string {
    if (!expression) { throw new ConditionError('Cannot concat an expression without an expression'); }
    let combined = '(' + expression + andExpression + ')';
    if (orExpression.length > 0) {
      combined = '(' + combined + orExpression + ')';
    }
    return combined;
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

  static fromAttributesToValueMap(attributesToValueMap: any): Condition {
    const cond = createEqualsConditionFromAttributeToValueMap(attributesToValueMap);
    return cond;
  }
}

export type ConditionLike = Condition | any;

export class ConditionError extends Error {}

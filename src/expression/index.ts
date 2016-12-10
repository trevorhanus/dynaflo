import Fluent from '..';

export interface Expression {
  exprString(): string;
  nameMap(): Fluent.NameMap;
  valueMap(): Fluent.ValueMap;
}

import Dynaflo from '..';

export interface Expression {
  exprString(): string;
  nameMap(): Dynaflo.NameMap;
  valueMap(): Dynaflo.ValueMap;
}

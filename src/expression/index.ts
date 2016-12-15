import Dynaflo from '..';

export interface Expression {
  exprString(): string;
  nameMap(): NameMap;
  valueMap(): ValueMap;
}

export interface ValueMap {
  [safeValue: string]: (string | boolean | number);
}

export interface NameMap {
  [safeName: string]: string;
}

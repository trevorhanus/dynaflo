import Dynaflo from '../..';

export interface Comparator {
  exprString(safePath?: string): string;
  valueMap(): Dynaflo.ValueMap;
}

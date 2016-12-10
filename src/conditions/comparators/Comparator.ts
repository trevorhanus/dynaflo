import Fluent from '../..';

export interface Comparator {
  exprString(safePath?: string): string;
  valueMap(): Fluent.ValueMap;
}

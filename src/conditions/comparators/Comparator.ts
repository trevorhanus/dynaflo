import Dynaflo from '../..';
import {ValueMap} from '../../expression';

export interface Comparator {
  exprString(safePath?: string): string;
  valueMap(): ValueMap;
}

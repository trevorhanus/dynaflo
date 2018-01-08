import Dynaflo from '../..';
import {ValueMap} from '../../interfaces';

export interface Comparator {
  exprString(safePath?: string): string;
  valueMap(): ValueMap;
}

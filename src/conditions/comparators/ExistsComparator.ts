import Dynaflo from '../..';
import {Comparator} from './Comparator';

export default class ExistsComparator implements Comparator {

  exprString(safePath: string): string {
    return 'attribute_exists(' + safePath + ')';
  }

  valueMap(): Dynaflo.ValueMap {
    const noValueMap = {};
    return noValueMap;
  }
}

import Dynaflo from '../..';
import {ValueMap} from '../../interfaces';
import {Comparator} from './Comparator';

export default class NotExistsComparator implements Comparator {

  exprString(safePath: string): string {
    return 'attribute_not_exists(' + safePath + ')';
  }

  valueMap(): ValueMap {
    const noValueMap = {};
    return noValueMap;
  }
}

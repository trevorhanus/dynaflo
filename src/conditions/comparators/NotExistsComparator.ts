import Fluent from '../..';
import {Comparator} from './Comparator';

export default class NotExistsComparator implements Comparator {

  exprString(safePath: string): string {
    return 'attribute_not_exists(' + safePath + ')';
  }

  valueMap(): Fluent.ValueMap {
    const noValueMap = {};
    return noValueMap;
  }
}

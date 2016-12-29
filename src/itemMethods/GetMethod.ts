import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import KeyParam from '../params/KeyParam';
import Pluckable from '../methodTraits/Pluckable';
import ConsistentReadable from '../methodTraits/ConsistentReadable';

export default class GetMethod extends BaseMethod implements Pluckable, ConsistentReadable {
  constructor(tableName: string, key: any) {
    super('get');
    super.addTableNameParam(tableName);
    const keyParam = new KeyParam(key);
    super.addParam(keyParam);
  }

  pluck(...topLevelOrNestedAttributes: (string|any)[]): GetMethod {
    /* Pluckable mixin implements this method */
    return this;
  }

  consistentRead(option: boolean): BaseMethod {
    /* ConsistentReadable mixin implements this method */
    return this;
  }
}

applyMixins(GetMethod, [Pluckable, ConsistentReadable]);

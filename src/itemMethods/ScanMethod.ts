import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import IndexNameParam from '../params/IndexNameParam';
import Pluckable from '../methodTraits/Pluckable';
import Filterable from '../methodTraits/Filterable';
import Limitable from '../methodTraits/Limitable';
import ConsistentReadable from '../methodTraits/ConsistentReadable';

export default class ScanMethod extends BaseMethod implements 
  Pluckable, Filterable, Limitable, ConsistentReadable {
  constructor(tableName: string, indexName?: string) {
    super('scan');
    super.addTableNameParam(tableName);
    if (indexName) {
      const indexNameParam = new IndexNameParam(indexName);
      super.addParam(indexNameParam);
    }
  }

  filter(conditionOrAttributesToValueMap: ConditionLike): BaseMethod {
    /* Filterable mixin implements this method */
    return this;
  }

  pluck(...topLevelOrNestedAttributes: (string|any)[]): BaseMethod {
    /* Pluckable mixin implements this method */
    return this;
  }

  limit(limit: number): BaseMethod {
    /* Limitable mixin implements this method */
    return this;
  }

  consistentRead(option: boolean): BaseMethod {
    /* ConsistentReadable mixin implements this method */
    return this;
  }
}

applyMixins(ScanMethod, [Pluckable, Filterable, Limitable, ConsistentReadable]);

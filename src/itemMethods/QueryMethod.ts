import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import IndexNameParam from '../params/IndexNameParam';
import WhereKeyable from '../methodTraits/WhereKeyable';
import Pluckable from '../methodTraits/Pluckable';
import Filterable from '../methodTraits/Filterable';
import Limitable from '../methodTraits/Limitable';
import ConsistentReadable from '../methodTraits/ConsistentReadable';

export default class QueryMethod extends BaseMethod implements 
  Pluckable, Filterable, WhereKeyable, Limitable, ConsistentReadable {
  constructor(tableName: string, indexName?: string) {
    super('query');
    super.addTableNameParam(tableName);
    if (indexName) {
      const indexNameParam = new IndexNameParam(indexName);
      super.addParam(indexNameParam);
    }
  }

  whereKey(keyConditionOrAttributesToValueMap: ConditionLike): QueryMethod {
    /* WhereKeyable mixin implements this method */
    return this;
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

applyMixins(QueryMethod, [Pluckable, Filterable, WhereKeyable, Limitable, ConsistentReadable]);

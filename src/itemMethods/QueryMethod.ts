import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import TableNameParam from '../params/TableNameParam';
import IndexNameParam from '../params/IndexNameParam';
import KeyConditionParam from '../params/KeyConditionParam';
import FilterParam from '../params/FilterParam';
import PluckParam from '../params/PluckParam';

export default class QueryMethod extends BaseMethod {
  constructor(tableName: string, indexName?: string) {
    super(tableName, 'query');
    if (indexName) {
      const indexNameParam = new IndexNameParam(indexName);
      super.addParam(indexNameParam);
    }
  }

  whereKey(keyConditionOrAttributesToValueMap: ConditionLike): QueryMethod {
    const keyConditionParam = new KeyConditionParam(keyConditionOrAttributesToValueMap);
    super.addParam(keyConditionParam);
    return this;
  }

  filter(condition: Condition): QueryMethod {
    const filterParam = new FilterParam(condition);
    super.addParam(filterParam);
    return this;
  }

  pluck(...topLevelOrNestedAttributes: (string|any)[]): QueryMethod {
    const pluckParam = new PluckParam(topLevelOrNestedAttributes);
    super.addParam(pluckParam);
    return this;
  }
}

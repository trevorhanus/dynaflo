import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import { ConditionLike } from '../conditions/Condition';
import IndexNameParam from '../params/IndexNameParam';
import WhereKeyable from '../method-mixins/WhereKeyable';
import Pluckable from '../method-mixins/Pluckable';
import Filterable from '../method-mixins/Filterable';
import Limitable from '../method-mixins/Limitable';
import ConsistentReadable from '../method-mixins/ConsistentReadable';

export default class QueryMethod extends BaseMethod implements Pluckable, Filterable, WhereKeyable, Limitable, ConsistentReadable {
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

    filter(conditionOrAttributesToValueMap: ConditionLike): QueryMethod {
        /* Filterable mixin implements this method */
        return this;
    }

    pluck(...topLevelOrNestedAttributes: (string | any)[]): QueryMethod {
        /* Pluckable mixin implements this method */
        return this;
    }

    limit(limit: number): QueryMethod {
        /* Limitable mixin implements this method */
        return this;
    }

    consistentRead(option: boolean): QueryMethod {
        /* ConsistentReadable mixin implements this method */
        return this;
    }
}

applyMixins(QueryMethod, [Pluckable, Filterable, WhereKeyable, Limitable, ConsistentReadable]);

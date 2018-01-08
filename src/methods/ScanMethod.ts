import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import { ConditionLike } from '../conditions/Condition';
import IndexNameParam from '../params/IndexNameParam';
import Pluckable from '../method-mixins/Pluckable';
import Filterable from '../method-mixins/Filterable';
import Limitable from '../method-mixins/Limitable';
import ConsistentReadable from '../method-mixins/ConsistentReadable';

export default class ScanMethod extends BaseMethod implements Pluckable, Filterable, Limitable, ConsistentReadable {

    constructor(tableName: string, indexName?: string) {
        super('scan');
        super.addTableNameParam(tableName);
        if (indexName) {
            const indexNameParam = new IndexNameParam(indexName);
            super.addParam(indexNameParam);
        }
    }

    filter(conditionOrAttributesToValueMap: ConditionLike): ScanMethod {
        /* Filterable mixin implements this method */
        return this;
    }

    pluck(...topLevelOrNestedAttributes: (string | any)[]): ScanMethod {
        /* Pluckable mixin implements this method */
        return this;
    }

    limit(limit: number): ScanMethod {
        /* Limitable mixin implements this method */
        return this;
    }

    consistentRead(option: boolean): ScanMethod {
        /* ConsistentReadable mixin implements this method */
        return this;
    }
}

applyMixins(ScanMethod, [Pluckable, Filterable, Limitable, ConsistentReadable]);

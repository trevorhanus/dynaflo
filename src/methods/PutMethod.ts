import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import { ConditionLike } from '../conditions/Condition';
import ItemParam from '../params/ItemParam';
import Whenable from '../method-mixins/Whenable';

export default class PutMethod extends BaseMethod {
    constructor(tableName: string, item: any) {
        super('put');
        super.addTableNameParam(tableName);
        const itemParam = new ItemParam(item);
        super.addParam(itemParam);
    }

    when(conditionOrAttributesToValueMap: ConditionLike): PutMethod {
        /* Whenable mixin implements this method */
        return this;
    }
}

applyMixins(PutMethod, [Whenable]);

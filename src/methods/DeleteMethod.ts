import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import Condition, { ConditionLike } from '../conditions/Condition';
import KeyParam from '../params/KeyParam';
import Whenable from '../method-mixins/Whenable';

export default class DeleteMethod extends BaseMethod implements Whenable {
    constructor(tableName: string, key: any) {
        super('delete');
        super.addTableNameParam(tableName);
        const keyParam = new KeyParam(key);
        super.addParam(keyParam);
    }

    when(conditionOrAttributesToValueMap: ConditionLike): DeleteMethod {
        /* Whenable mixin implements this method */
        return this;
    }
}

applyMixins(DeleteMethod, [Whenable]);

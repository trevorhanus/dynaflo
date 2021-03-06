import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import { ConditionLike } from '../conditions/Condition';
import KeyParam from '../params/KeyParam';
import UpdateExpressionParam from '../params/UpdateExpressionParam';
import SetExpression from '../updateExpressions/SetExpression';
import DeleteExpression from '../updateExpressions/DeleteExpression';
import RemoveExpression from '../updateExpressions/RemoveExpression';
import Whenable from '../method-mixins/Whenable';

export default class UpdateMethod extends BaseMethod implements Whenable {
    private updateExpressionParam: UpdateExpressionParam;

    constructor(tableName: string, key: any) {
        super('update');
        super.addTableNameParam(tableName);
        const keyParam = new KeyParam(key);
        super.addParam(keyParam);
        this.updateExpressionParam = new UpdateExpressionParam();
        super.addParam(this.updateExpressionParam);
    }

    set(item: any): UpdateMethod {
        const setExpression = new SetExpression(item);
        this.updateExpressionParam.addExpression(setExpression);
        return this;
    }

    remove(...attributes: (string | any)[]): UpdateMethod {
        const removeExpression = new RemoveExpression(attributes);
        this.updateExpressionParam.addExpression(removeExpression);
        return this;
    }

    delete(topLevelAttr: string, itemsToDelete: string[]): UpdateMethod {
        const deleteExpression = new DeleteExpression(topLevelAttr, itemsToDelete);
        this.updateExpressionParam.addExpression(deleteExpression);
        return this;
    }

    when(conditionOrAttributesToValueMap: ConditionLike): UpdateMethod {
        /* Whenable mixin implements this method */
        return this;
    }
}

applyMixins(UpdateMethod, [Whenable]);

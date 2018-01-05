import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import TableNameParam from '../params/TableNameParam';
import ItemParam from '../params/ItemParam';
import Whenable from '../methodTraits/Whenable';

export default class PutMethod extends BaseMethod {
  constructor(tableName: string, item: any) {
    super('put');
    super.addTableNameParam(tableName);
    const itemParam = new ItemParam(item);
    super.addParam(itemParam);
  }

  when(conditionOrAttributesToValueMap: ConditionLike): BaseMethod {
    /* Whenable mixin implements this method */
    return this;
  }
}

applyMixins(PutMethod, [Whenable]);

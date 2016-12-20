import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import KeyParam from '../params/KeyParam';
import Whenable from '../methodTraits/Whenable';

export default class DeleteMethod extends BaseMethod implements Whenable {
  constructor(tableName: string, key: any) {
    super(tableName, 'delete');
    const keyParam = new KeyParam(key);
    super.addParam(keyParam);
  }

  when(conditionOrAttributesToValueMap: ConditionLike): BaseMethod {
    /* Whenable mixin implements this method */
    return this;
  }
}

applyMixins(DeleteMethod, [Whenable]);

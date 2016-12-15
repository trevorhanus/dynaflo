import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import KeyParam from '../params/KeyParam';
import Whenable from '../methodTraits/Whenable';

export default class DeleteMethod extends BaseMethod implements Whenable {
  constructor(tableName: string, key: any) {
    super(tableName, 'get');
    const keyParam = new KeyParam(key);
    super.addParam(keyParam);
  }

  // when(conditionOrAttributesToValueMap: ConditionLike): DeleteMethod {
  //   const whenConditionParam = new WhereConditionParam(conditionOrAttributesToValueMap);
  //   super.addParam(whenConditionParam);
  //   return this;
  // }
}

applyMixins(DeleteMethod, [Whenable]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
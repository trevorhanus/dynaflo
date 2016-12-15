import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import TableNameParam from '../params/TableNameParam';
import ItemParam from '../params/ItemParam';
import WhereConditionParam from '../params/WhereConditionParam';
import Whenable from '../methodTraits/Whenable';

export default class PutMethod extends BaseMethod {
  constructor(tableName: string, item: any) {
    super(tableName, 'put');
    this.addItemParam(item);
  }

  // when(conditionOrAttributesToValueMap: ConditionLike): PutMethod {
  //   const whenConditionParam = new WhereConditionParam(conditionOrAttributesToValueMap);
  //   super.addParam(whenConditionParam);
  //   return this;
  // }

  private addItemParam(item: any): void {
    const itemParam = new ItemParam(item);
    super.addParam(itemParam);
  }
}

applyMixins(PutMethod, [Whenable]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

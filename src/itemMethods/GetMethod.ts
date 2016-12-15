import BaseMethod from './BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import KeyParam from '../params/KeyParam';
import PluckParam from '../params/PluckParam';

export default class GetMethod extends BaseMethod {
  constructor(tableName: string, key: any) {
    super(tableName, 'get');
    const keyParam = new KeyParam(key);
    super.addParam(keyParam);
  }

  pluck(...topLevelOrNestedAttributes: (string|any)[]): GetMethod {
    const pluckParam = new PluckParam(topLevelOrNestedAttributes);
    super.addParam(pluckParam);
    return this;
  }
}

import {Param} from './ParamEnum';

export default class ExpressionAttributeNames {
  paramType: Param = Param.ExpressionAttributeNames;
  _value: string;

  toJS(): string {
    return this._value;
  }
}

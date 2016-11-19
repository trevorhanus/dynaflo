import {Param} from './ParamEnum';

export default class ExpressionAttributeValues {
  paramType: Param = Param.ExpressionAttributeValues;
  _value: string;

  toJS(): string {
    return this._value;
  }
}

import {Param} from './ParamEnum';

type Options = 'INDEXES' | 'TOTAL' | 'NONE';

export default class ReturnConsumedCapacity {
  paramType: Param = Param.ReturnConsumedCapacity;
  _value: Options = 'NONE';

  set(value: Options) {
    this._value = value;
  }

  toJS(): string {
    return this._value;
  }
}

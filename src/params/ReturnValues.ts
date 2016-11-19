import {Param} from './ParamEnum';

type Options = 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';

export default class ReturnValues {
  paramType: Param = Param.ReturnValues;
  _value: Options = 'NONE';

  set(value: Options) {
    this._value = value;
  }

  toJS(): string {
    return this._value;
  }
}

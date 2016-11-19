import {Param} from './ParamEnum';

type Options = 'SIZE' | 'NONE';

export default class ReturnItemCollectionMetrics {
  paramType: Param = Param.ReturnItemCollectionMetrics;
  _value: Options = 'NONE';

  set(value: Options) {
    this._value = value;
  }

  toJS(): string {
    return this._value;
  }
}

import {Param} from './ParamEnum';

export default class Key {
  paramType: Param = Param.Key;
  _object: Object;

  constructor(item: Object) {
    this._object = item;
  }

  toJS(): Object {
    return this._object;
  }
}

import {Param} from './ParamEnum';

export default class Item {
  paramType: Param = Param.Item;
  _object: Object;

  constructor(item: Object) {
    this._object = item;
  }

  toJS(): Object {
    return this._object;
  }
}

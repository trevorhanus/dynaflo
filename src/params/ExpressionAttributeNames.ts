import {Param} from './ParamEnum';

export default class ExpressionAttributeNames {
  paramType: Param = Param.ExpressionAttributeNames;
  _map: Object = {};

  add(key: string, value: string): void {
    if (this._map[key]) { throw new ExpressionAttributeNamesError('Attempting to add a key that already exists.'); }
    this._map[key] = value;
  }

  toJS(): Object {
    return this._map;
  }
}

export class ExpressionAttributeNamesError extends Error {}

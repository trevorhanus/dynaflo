import {Param, ValueMap, NameMap} from '../params/Param';

export default class KeyParam implements Param {
  private _key: any;
  key: string = 'Key';

  constructor(key: any) {
    this._key = key;
  }

  value(): string {
    return this._key;
  }

  safeValueMap(): ValueMap {
    return {};
  }

  safeNameMap(): NameMap {
    return {};
  }
}

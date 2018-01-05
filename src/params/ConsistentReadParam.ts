import {Param, ValueMap, NameMap} from '../params/Param';

export default class LimitParam implements Param {
  key: string = 'ConsistentRead';
  private option: boolean;

  constructor(option: boolean) {
    this.option = option;
  }

  value(): boolean {
    return this.option;
  }

  safeValueMap(): ValueMap {
    return {}; // no values
  }

  safeNameMap(): NameMap {
    return {};
  }
}

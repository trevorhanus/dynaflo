import {Param, ValueMap, NameMap} from '../params/Param';

export default class LimitParam implements Param {
  key: string = 'Limit';
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  value(): number {
    return this.limit;
  }

  safeValueMap(): ValueMap {
    return {}; // no values
  }

  safeNameMap(): NameMap {
    return {};
  }
}

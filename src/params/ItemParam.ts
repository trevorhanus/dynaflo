import {Param, ValueMap, NameMap} from '../params/Param';

export default class ItemParam implements Param {
  private item: any;
  key: string = 'Item';

  constructor(item: any) {
    this.item = item;
  }

  value(): string {
    return this.item;
  }

  safeValueMap(): ValueMap {
    return {};
  }

  safeNameMap(): NameMap {
    return {};
  }
}

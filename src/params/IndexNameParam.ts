import {Param, ValueMap, NameMap} from '../params/Param';

export default class IndexNameParam implements Param {
  key: string = 'IndexName';
  private indexName: string;

  constructor(indexName: string) {
    this.indexName = indexName;
  }

  value(): string {
    return this.indexName;
  }

  safeValueMap(): ValueMap {
    return {}; // no values
  }

  safeNameMap(): NameMap {
    return {};
  }
}

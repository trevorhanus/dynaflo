import {Param, ValueMap, NameMap} from '../params/Param';

export default class TableNameParam implements Param {
  key: string = 'TableName';
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  value(): string {
    return this.tableName;
  }

  safeValueMap(): ValueMap {
    return {}; // no values
  }

  safeNameMap(): NameMap {
    return {};
  }
}

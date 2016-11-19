import {Param} from './ParamEnum';

export default class TableName {
  paramType: Param = Param.TableName;
  _tableName: string;

  constructor(tableName: string) {
    this._tableName = tableName;
  }

  toJS(): string {
    return this._tableName;
  }
}

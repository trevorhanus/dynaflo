import GetParams from './GetParams';

export class Table {
  private _tableName: string;

  constructor(tableName: string) {
    this._tableName = tableName;
  }

  get(key: Object): GetParams {
    return new GetParams(this._tableName, key);
  };

  put(item: Object): PutParams {
    return new PutParams();
  };

  query(): Params {
    return new Params(); 
  };

  scan(): Params {
    return new Params();
  };

  update(key: Object): Params{
    return new Params();
  };

  delete(key: Object): Params{
    return new Params();
  };
}
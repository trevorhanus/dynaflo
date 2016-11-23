import Get from './Get';
import Put from './Put';
// import Query from './Query';

export class Table {
  private _tableName: string;

  constructor(tableName: string) {
    this._tableName = tableName;
  }

  put(item: Object): Put {
    return new Put(this._tableName, item);
  };

  get(key: Object): Get {
    return new Get(this._tableName, key);
  };

  // query(): Query {
  //   return new Query(this._tableName); 
  // };

  // scan(): Params {
  //   return new Params();
  // };

  // update(key: Object): Params{
  //   return new Params();
  // };

  // delete(key: Object): Params{
  //   return new Params();
  // };
}
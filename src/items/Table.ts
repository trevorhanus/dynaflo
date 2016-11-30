import Get from './Get';
import Put from './Put';
import Delete from './Delete';
import Update from './Update';
import Query from './Query';

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

  query(indexName?: string): Query {
    return new Query(this._tableName, indexName); 
  };

  // scan(): Params {
  //   return new Params();
  // };

  update(key: Object): Update{
    return new Update(this._tableName, key);
  };

  delete(key: Object): Delete{
    return new Delete(this._tableName, key);
  };
}
import GetMethod from './itemMethods/GetMethod';
import PutMethod from './itemMethods/PutMethod';
import DeleteMethod from './itemMethods/DeleteMethod';
import UpdateMethod from './itemMethods/UpdateMethod';
import QueryMethod from './itemMethods/QueryMethod';

export default class Table {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  put(item: any): PutMethod {
    return new PutMethod(this.tableName, item);
  };

  get(key: any): GetMethod {
    return new GetMethod(this.tableName, key);
  };

  query(indexName?: string): QueryMethod {
    return new QueryMethod(this.tableName, indexName);
  };

  // scan(): Params {
  //   return new Params();
  // };

  update(key: any): UpdateMethod {
    return new UpdateMethod(this.tableName, key);
  };

  delete(key: any): DeleteMethod {
    return new DeleteMethod(this.tableName, key);
  };
}

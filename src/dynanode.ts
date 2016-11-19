import {Table} from './items/Table';
import * as tableMethods from './tables';

class Dynanode {

  Table: Table;

  table(tableName: string): Table {
    return new Table(tableName);
  }

  createTable = tableMethods.createTable;
  deleteTable = tableMethods.deleteTable;
  describeTable = tableMethods.describeTable;

  defaults() {
    return new DefaultParams();
  }

  awsConfig(options: Object) {

  }
}

export default new Dynanode();

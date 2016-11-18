import {Table} from './Table';
import * as tableMethods from './tableMethods';

class Dynanode {

  Table: Table;

  table(tableName: string): Table {
    return new Table(tableName);
  }

  createTable() {
    return tableMethods.createTable();
  }

  deleteTable() {

  }

  describeTable() {

  }

  listTables() {

  }

  updateTable() {

  }

  defaults() {
    return new DefaultParams();
  }

  awsConfig(options: Object) {

  }
}

export default new Dynanode();

import {Table} from './items/Table';
import Condition from './conditions/Condition';
import * as tableMethods from './tables';

class Dynanode {

  Table: Table;

  table(tableName: string): Table {
    return new Table(tableName);
  }

  createTable = tableMethods.createTable;
  deleteTable = tableMethods.deleteTable;
  describeTable = tableMethods.describeTable;

  attr(attribute: (string | Object)): Condition {
    return new Condition(attribute);
  }
}

export default new Dynanode();

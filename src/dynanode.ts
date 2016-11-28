import * as AWS from 'aws-sdk';
import {Table} from './items/Table';
import Condition from './conditions/Condition';
import * as tableMethods from './tables';

let dynamoDB;
let docClient;

class Dynanode {

  constructor(config: dn.Config) {
    AWS.config.update(config);
    dynamoDB = new AWS.DynamoDB();
    docClient = new AWS.DynamoDB.DocumentClient();
  }

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

export default Dynanode;
export {
  dynamoDB as dynamoDB,
  docClient as docClient
};

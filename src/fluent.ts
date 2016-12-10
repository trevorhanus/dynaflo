import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {Table} from './items/Table';
import Condition from './conditions/Condition';
import {createTable, deleteTable, describeTable} from './tables';

let dynamoDB: AWS.DynamoDB;
let docClient: DocumentClient;

export {
  docClient,
  dynamoDB
}

export class Fluent {

  constructor(config: Fluent.Config) {
    AWS.config.update(config);
    dynamoDB = new AWS.DynamoDB();
    docClient = new AWS.DynamoDB.DocumentClient();
  }

  Table: Table;

  table(tableName: string): Table {
    return new Table(tableName);
  }

  createTable = createTable;
  deleteTable = deleteTable;
  describeTable = describeTable;

  attr(attribute: Fluent.AttributeLike): Condition {
    return new Condition(attribute);
  }
}

export module Fluent {
  export interface Config {
    region: string;
    endpoint: string;
    accessKeyId: string;
    secretAccessKey: string;
  }

  export interface AttributeLike {

  }

  export interface ValueMap {
    [safeValue: string]: (string | boolean | number);
  }

  export interface NameMap {
    [safeName: string]: string;
  }

  export interface Params {
    TableName: string;
    IndexName?: string;
    Key?: Object;
    Item?: Object;
    FilterExpression?: string;
    ConditionExpression?: string;
    ProjectionExpression?: string;
    UpdateExpression?: string;
    KeyConditionExpression?: string;
    ExpressionAttributeNames?: NameMap;
    ExpressionAttributeValues?: ValueMap;
    ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
    ReturnValues?: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';
    ReturnItemCollectionMetrics?: 'SIZE' | 'NONE';
  }

  export type ReturnConsumedCapacity = 'INDEXES' | 'TOTAL' | 'NONE';
}
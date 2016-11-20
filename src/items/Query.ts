import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import Base from './Base';
import * as p from '../params';

export default class Query extends Base {

  constructor(tableName: string) {
    super(tableName);
  }

  run(): Promise<any> {
    return super.run('query');
  }
}

const acceptedParamTypes: Param[] = [
  Param.TableName, // Base
  Param.IndexName,
  Param.ConditionalOperator,
  Param.ConsistentRead,
  Param.ExclusiveStartKey,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.FilterExpression,
  Param.KeyConditionExpression,
  Param.Limit,
  Param.ProjectionExpression,
  Param.ReturnConsumedCapacity,
  Param.ScanIndexForward,
  Param.Select
];

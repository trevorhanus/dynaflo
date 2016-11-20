import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import Base from './Base';
import * as p from '../params';

export default class Scan extends Base {

  constructor(tableName: string) {
    super(tableName);
  }

  run(): Promise<any> {
    return super.run('scan');
  }
}

const acceptedParamTypes: Param[] = [
  Param.TableName, // Base
  Param.IndexName,
  Param.ConditionalOperator,
  Param.ExclusiveStartKey,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.FilterExpression,
  Param.ProjectionExpression,
  Param.Limit,
  Param.ConsistentRead,
  Param.Segment,
  Param.Select,
  Param.TotalSegments,
  Param.ReturnConsumedCapacity
];

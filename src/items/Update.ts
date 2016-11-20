import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import Base from './Base';
import * as p from '../params';

export default class Update extends Base {

  constructor(tableName: string) {
    super(tableName);
  }

  run(): Promise<any> {
    return super.run('update');
  }
}

const acceptedParamTypes: Param[] = [
  Param.TableName, // Base
  Param.Key,
  Param.UpdateExpression,
  Param.ConditionExpression,
  Param.ConditionalOperator,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.ReturnConsumedCapacity,
  Param.ReturnItemCollectionMetrics,
  Param.ReturnValues
];

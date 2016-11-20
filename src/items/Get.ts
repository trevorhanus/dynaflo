import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import Base from './Base';
import * as p from '../params';

export default class Get extends Base {
  Key: p.Key;
  ExpressionAttributeNames: p.ExpressionAttributeNames;
  ProjectionExpression: p.ProjectionExpression;

  constructor(tableName: string, key: Object) {
    super(tableName);
    this.Key = new p.Key(key);
  }

  pluck(...attributes: (string | Object)[]): Get {
    if (!this.ExpressionAttributeNames) {
      this.ExpressionAttributeNames = new p.ExpressionAttributeNames();
    }
    this.ProjectionExpression = new p.ProjectionExpression(this.ExpressionAttributeNames, attributes);
    return this;
  }

  run(): Promise<any> {
    return super.run('get');
  }
}

const acceptedParamTypes: Param[] = [
  Param.TableName,
  Param.Key,
  Param.ProjectionExpression,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.ConsistentRead,
  Param.ReturnConsumedCapacity
];

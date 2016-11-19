import {Param} from '../params/ParamEnum';
import * as p from '../params';
import {docClient} from '../dynamoDb';
import Base from './Base';

export default class Put extends Base {
  Item: p.Item;
  // ConditionExpression: string;

  constructor(tableName: string, item: Object) {
    super(tableName);
    this.Item = new p.Item(item);
  }

  // ConditionExpression
  if(expression: string | Object) { // some_key >= some_other_key + 2
    return this;
  }

  run(): Promise<any> {
    return new Promise((resolve, reject) => {
      docClient.put(this._params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

const acceptedParamTypes: Param[] = [
  Param.TableName,
  Param.Item,
  Param.ConditionExpression,
  Param.ConditionalOperator,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.ReturnConsumedCapacity,
  Param.ReturnItemCollectionMetrics,
  Param.ReturnValues
];

import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import Base from './Base';
import * as p from '../params';

export default class Get extends Base {
  Key: p.Key;
  // ProjectionExpresssion: string;

  constructor(tableName: string, key: Object) {
    super(tableName);
    this.Key = new p.Key(key);
  }

  attrs(attributes: string) {
    // this.ProjectionExpression = attributes;
    return this;
  }

  run(): Promise<any> {
    return new Promise((resolve, reject) => {
      docClient.get(this._params, (err, data) => {
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
  Param.Key,
  Param.ProjectionExpression,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.ConsistentRead,
  Param.ReturnConsumedCapacity
];

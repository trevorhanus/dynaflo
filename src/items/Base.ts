import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import * as p from '../params';

export default class Base {
  tableName: string;
  // ReturnConsumedCapacity: p.ReturnConsumedCapacity = new p.ReturnConsumedCapacity();

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  // consumedCapacity(value: string): Base {
  //   this.ReturnConsumedCapacity.set(value);
  //   return this;
  // }

  _params() {
    let params = {};
    params.TableName = this.tableName;
    this._assignKey(params);
    this._assignItem(params);
    this._assignFilterExpression(params);
    this._assignExpressionNameMap(params);
    this._assignExpressionValueMap(params);
    return params;
  }

  _assignKey(params: Object) {
    if (this.key) {
      params.Key = this.key;
    }
  }

  _assignItem(params: Object): void{
    if (this.item) {
      params.Item = this.item;
    }
  }

  _assignFilterExpression(params: Object): void{
    if (this.filterCondition) {
      params.FilterExpression = this.filterCondition.toExpressionString();
    }
  }

  _assignExpressionNameMap(params: Object) {
    const nameMap = this._expressionNameMap && this._expressionNameMap();
    if (nameMap && Object.keys(nameMap).length > 0) {
      params.ExpressionAttributeNames = nameMap;
    }
  }

  _assignExpressionValueMap(params: Object) {
    const valueMap = this._expressionValueMap && this._expressionValueMap();
    if (valueMap && Object.keys(valueMap).length > 0) {
      params.ExpressionAttributeValues = valueMap;
    }
  }

  run(method: string): Promise<any> {
    return new Promise((resolve, reject) => {
      docClient[method](this._params(), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

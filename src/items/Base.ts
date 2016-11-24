///<reference path="../../src/dynanode.d.ts" />
import {docClient} from '../dynamoDb';

export default class Base {
  tableName: string;
  key?: Object;
  item?: Object;
  filterCondition?: dn.Condition;
  whereCondition?: dn.Condition;
  nameMap() { /* override in parent class */ }
  valueMap() { /* override in parent class */ }

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  _params() {
    let params: dn.Params = {
      TableName: this.tableName,
      ReturnValues: 'NONE',
      ReturnConsumedCapacity: 'NONE',
      ReturnItemCollectionMetrics: 'NONE'
    };
    this._assignKey(params);
    this._assignItem(params);
    this._assignProjectionExpression(params);
    this._assignFilterExpression(params);
    this._assignConditionExpression(params);
    this._assignUpdateExpression(params);
    this._assignExpressionNameMap(params);
    this._assignExpressionValueMap(params);
    return params;
  }

  _assignKey(params: dn.Params) {
    if (this.key) {
      params.Key = this.key;
    }
  }

  _assignItem(params: dn.Params): void{
    if (this.item) {
      params.Item = this.item;
    }
  }

  _assignProjectionExpression(params: dn.Params): void{
    if (this.pluckAttributes) {
      params.ProjectionExpression = this.projectionExpression();
    }
  }

  _assignFilterExpression(params: dn.Params): void{
    if (this.filterCondition) {
      params.FilterExpression = this.filterCondition.exprString();
    }
  }

  _assignConditionExpression(params: dn.Params) {
    if (this.whereCondition) {
      params.ConditionExpression = this.whereCondition.exprString();
    }
  }

  _assignUpdateExpression(params: dn.Params) {
    const updateExpr = this.updateExpression && this.updateExpression();
    if (updateExpr && updateExpr !== '') {
      params.UpdateExpression = updateExpr;
    }
  }

  _assignExpressionNameMap(params: dn.Params) {
    const nameMap: dn.NameMap = this.nameMap();
    if (Object.keys(nameMap).length > 0) {
      params.ExpressionAttributeNames = nameMap;
    }
  }

  _assignExpressionValueMap(params: dn.Params) {
    const valueMap: dn.ValueMap = this.valueMap();
    if (Object.keys(valueMap).length > 0) {
      params.ExpressionAttributeValues = valueMap;
    }
  }

  run(method: string): Promise<any> {
    console.log(this._params());
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

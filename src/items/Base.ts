///<reference path="../../src/fluent.d.ts" />
import {docClient} from '../fluent';

export default class Base {
  _log: boolean = false;
  tableName: string;
  indexName?: string;
  key?: Object;
  item?: Object;
  filterCondition?: f.Condition;
  whenCondition?: f.Condition;
  nameMap() { /* override in parent class */ }
  valueMap() { /* override in parent class */ }

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  _params() {
    let params: f.Params = {
      TableName: this.tableName,
      ReturnValues: 'NONE',
      ReturnConsumedCapacity: 'NONE',
      ReturnItemCollectionMetrics: 'NONE'
    };
    this._assignIndexName(params);
    this._assignKey(params);
    this._assignItem(params);
    this._assignKeyConditionExpression(params);
    this._assignProjectionExpression(params);
    this._assignFilterExpression(params);
    this._assignConditionExpression(params);
    this._assignUpdateExpression(params);
    this._assignExpressionNameMap(params);
    this._assignExpressionValueMap(params);
    return params;
  }

  _assignIndexName(params: f.Params) {
    if (this.indexName) {
      params.IndexName = this.indexName;
    }
  }

  _assignKey(params: f.Params) {
    if (this.key) {
      params.Key = this.key;
    }
  }

  _assignItem(params: f.Params): void{
    if (this.item) {
      params.Item = this.item;
    }
  }

  _assignKeyConditionExpression(params: f.Params): void {
    if (this.keyCondition) {
      params.KeyConditionExpression = this.keyCondition.exprString();
    }
  }

  _assignProjectionExpression(params: f.Params): void{
    if (this.pluckAttributes) {
      params.ProjectionExpression = this.projectionExpression();
    }
  }

  _assignFilterExpression(params: f.Params): void{
    if (this.filterCondition) {
      params.FilterExpression = this.filterCondition.exprString();
    }
  }

  _assignConditionExpression(params: f.Params) {
    if (this.whenCondition) {
      params.ConditionExpression = this.whenCondition.exprString();
    }
  }

  _assignUpdateExpression(params: f.Params) {
    const updateExpr = this.updateExpression && this.updateExpression();
    if (updateExpr && updateExpr !== '') {
      params.UpdateExpression = updateExpr;
    }
  }

  _assignExpressionNameMap(params: f.Params) {
    const nameMap: f.NameMap = this.nameMap();
    if (Object.keys(nameMap).length > 0) {
      params.ExpressionAttributeNames = nameMap;
    }
  }

  _assignExpressionValueMap(params: f.Params) {
    const valueMap: f.ValueMap = this.valueMap();
    if (Object.keys(valueMap).length > 0) {
      params.ExpressionAttributeValues = valueMap;
    }
  }

  run(method: string): Promise<any> {
    if (this._log) {
      console.log(this._params());
    }
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

  log() {
    this._log = true;
    return this;
  }
}

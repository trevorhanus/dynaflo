import {docClient} from '../dynamoDb';

export default class Get {
  TableName: string;
  Key: object;
  ProjectionExpresssion: string;

  constructor(tableName: string, key: object) {
    this.Key = key;
    this.TableName = tableName;
  }

  attrs(attributes: string[]) {
    this.ProjectionExpression = attributes;
    return this;
  }

  run(): Promise<any> {
    return new Promise((resolve, reject) => {
      docClient.get(this._params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Item, data.ConsumedCapacity);
        }
      });
    });
  }

  get _params() {
    let params = {};
    Object.keys(this).forEach(key => {
      if (this[key]) {
        params[key] = this[key];
      }
    });
    return params;
  }
}
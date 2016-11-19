import {docClient} from '../dynamoDb';
import Base from './Base';

export default class Get extends Base {
  Key: object;
  ProjectionExpresssion: string;

  constructor(tableName: string, key: object) {
    super(tableName);
    this.Key = key;
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
}

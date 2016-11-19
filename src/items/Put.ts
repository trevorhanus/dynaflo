import {docClient} from '../dynamoDb';
import Base from './Base';

export default class Put extends Base {
  Item: object;
  ConditionExpression: string;

  constructor(tableName: string, item: object) {
    super(tableName);
    this.Item = item;
  }

  run(): Promise<any> {
    return new Promise((resolve, reject) => {
      docClient.put(this._params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Attributes, data.ConsumedCapacity);
        }
      });
    });
  }
}

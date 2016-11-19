import {docClient} from '../dynamoDb';

export default class Put {
  TableName: string;
  Item: object;
  ConditionExpression: string;
  ReturnValues: string = 'ALL_OLD';
  ReturnConsumedCapacity: string = 'TOTAL';
  ReturnItemCollectionMetrics: string = 'SIZE';

  constructor(tableName: string, item: object) {
    this.Item = item;
    this.TableName = tableName;
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

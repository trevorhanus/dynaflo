import MethodParamsBase from './MethodParamsBase';
import * as Params from './Params';
import {DocumentClient} from 'aws-sdk'.DynamoDB;

const docClient = new DocumentClient();

export class GetParams extends MethodParamsBase {
  Key: Params.KeyParam;
  TableName: string;
  AttributesToGet: Params.AttributesToGetParam;

  constructor(tableName: string, key: Object) {
    this.Key = new Params.KeyParam(key);
    this.TableName = tableName;
  }

  attrs(attributes: string[]) {
    this.AttributesToGet = new Params.AttributesToGetParam(attributes);
    return this;
  }

  project()

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
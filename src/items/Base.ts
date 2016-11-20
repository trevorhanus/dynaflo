import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import * as p from '../params';

export default class Base {
  TableName: p.TableName;
  ReturnConsumedCapacity: p.ReturnConsumedCapacity = new p.ReturnConsumedCapacity();

  constructor(tableName: string) {
    this.TableName = new p.TableName(tableName);
  }

  consumedCapacity(value: string): Base {
    this.ReturnConsumedCapacity.set(value);
    return this;
  }

  get _params() {
    let params = {};
    Object.keys(this).forEach(key => {
      const paramType: Param = this[key].paramType;
      if (paramType >= 0) {
        params[key] = this[key].toJS();
      }
    });
    return params;
  }

  run(method: string): Promise<any> {
    return new Promise((resolve, reject) => {
      docClient[method](this._params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

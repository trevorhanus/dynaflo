import {Param} from '../params/ParamEnum';
import * as p from '../params';

export default class Base {
  TableName: p.TableName;
  ReturnConsumedCapacity: p.ReturnConsumedCapacity = new p.ReturnConsumedCapacity();
  // ExpressionAttributeNames: p.ExpressionAttributeNames = new p.ExpressionAttributeNames();
  // ExpressionAttributeValues: p.ExpressionAttributeValues = new p.ExpressionAttributeValues();

  constructor(tableName: string) {
    this.TableName = new p.TableName(tableName);
  }

  consumedCapacity(value: string) {
    this.ReturnConsumedCapacity.set(value);
  }

  get _params() {
    let params = {};
    Object.keys(this).forEach(key => {
      const paramType: Param = this[key].paramType;

      if (this.accepts(paramType)) {
        params[key] = this[key].toJS();
      }
    });
    return params;
  }

  accepts(paramType: Param): boolean {
    // TODO: figure out if this method accepts the paramType
    return true;
  }
}

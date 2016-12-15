import Dynaflo from '../';
import {docClient} from '../Dynaflo';
import {Param, NameMap, ValueMap} from '../params/Param';
import TableNameParam from '../params/TableNameParam';
import {assign as _assign} from 'lodash';
import {isEmpty as _isEmpty} from 'lodash';

export default class BaseMethod {
  private methodName: string;
  private shouldLog: boolean;
  private params: Param[] = [];

  constructor(tableName: string, methodName: string) {
    this.methodName = methodName;
    const tableNameParam = new TableNameParam(tableName);
    this.addParam(tableNameParam);
  }

  addParam(param: Param) {
    this.params.push(param);
  }

  log(): BaseMethod {
    this.shouldLog = true;
    return this;
  }

  run() {
    const docClientParams = this.buildParams();
    if (this.shouldLog) {
      console.log(docClientParams);
    }
    return new Promise((resolve, reject) => {
      docClient[this.methodName](docClientParams, (err: Error, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  private buildParams(): any {
    let valueMap: ValueMap = {};
    let nameMap: NameMap = {};
    let params: Dynaflo.Params = {
      ReturnValues: 'NONE', // set default
      ReturnItemCollectionMetrics: 'NONE' // set default
    };
    this.params.forEach((param: Param) => {
      params[param.key] = param.value();
      _assign(valueMap, param.safeValueMap());
      _assign(nameMap, param.safeNameMap());
    });
    if (!_isEmpty(valueMap)) {
      params.ExpressionAttributeValues = valueMap;
    }
    if (!_isEmpty(nameMap)) {
      params.ExpressionAttributeNames = nameMap;
    }
    return params;
  }
}

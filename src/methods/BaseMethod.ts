import Dynaflo from '../';
import { docClient } from '../Dynaflo';
import { Param, NameMap, ValueMap } from '../params/Param';
import TableNameParam from '../params/TableNameParam';
import { assign as _assign } from 'lodash';
import { isEmpty as _isEmpty } from 'lodash';
import { AWSError } from 'aws-sdk';

export default class BaseMethod {
    private methodName: string;
    private shouldLog: boolean;
    private params: Param[] = [];

    constructor(methodName: string) {
        this.methodName = methodName;
    }

    addParam(param: Param) {
        this.params.push(param);
    }

    addTableNameParam(tableName: string) {
        const tableNameParam = new TableNameParam(tableName);
        this.addParam(tableNameParam);
    }

    log(): BaseMethod {
        this.shouldLog = true;
        return this;
    }

    run(): Promise<any> {
        const docClientParams = this.buildParams();
        if (this.shouldLog) {
            console.log(docClientParams);
        }

        return new Promise((resolve, reject) => {
            docClient[this.methodName](docClientParams, (err: AWSError, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    buildParams(): any {
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

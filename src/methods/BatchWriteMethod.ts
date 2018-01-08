import BaseMethod from './BaseMethod';
import BatchWriteParam from '../params/BatchWriteParam';

export default class BatchWriteMethod extends BaseMethod {
    batchWriteParam: BatchWriteParam;

    constructor(tableName: string, items: any[], keysToDelete: any[]) {
        super('batchWrite');
        this.batchWriteParam = new BatchWriteParam(tableName);
        this.batchWriteParam.addPutItems(items);
        this.batchWriteParam.addKeysToDelete(keysToDelete);
        super.addParam(this.batchWriteParam);
    }

    batchDelete(keysToDelete: any[]) {
        this.batchWriteParam.addKeysToDelete(keysToDelete);
        return this;
    }

    batchPut(items: any[]) {
        this.batchWriteParam.addPutItems(items);
        return this;
    }
}

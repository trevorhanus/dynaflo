import GetMethod from './methods/GetMethod';
import PutMethod from './methods/PutMethod';
import DeleteMethod from './methods/DeleteMethod';
import UpdateMethod from './methods/UpdateMethod';
import QueryMethod from './methods/QueryMethod';
import ScanMethod from './methods/ScanMethod';
import BatchWriteMethod from './methods/BatchWriteMethod';

export default class Table {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    put(item: any): PutMethod {
        return new PutMethod(this.tableName, item);
    };

    get(key: any): GetMethod {
        return new GetMethod(this.tableName, key);
    };

    query(indexName?: string): QueryMethod {
        return new QueryMethod(this.tableName, indexName);
    };

    scan(indexName?: string): ScanMethod {
        return new ScanMethod(this.tableName, indexName);
    };

    update(key: any): UpdateMethod {
        return new UpdateMethod(this.tableName, key);
    };

    delete(key: any): DeleteMethod {
        return new DeleteMethod(this.tableName, key);
    };

    batchPut(items: any[]): BatchWriteMethod {
        return new BatchWriteMethod(this.tableName, items, []);
    }

    batchDelete(keysToDelete: any[]): BatchWriteMethod {
        return new BatchWriteMethod(this.tableName, [], keysToDelete);
    }
}

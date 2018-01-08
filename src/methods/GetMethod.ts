import applyMixins from '../utils/applyMixins';
import BaseMethod from './BaseMethod';
import KeyParam from '../params/KeyParam';
import Pluckable from '../method-mixins/Pluckable';
import ConsistentReadable from '../method-mixins/ConsistentReadable';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

export default class GetMethod extends BaseMethod implements Pluckable, ConsistentReadable {
    constructor(tableName: string, key: any) {
        super('get');
        super.addTableNameParam(tableName);
        const keyParam = new KeyParam(key);
        super.addParam(keyParam);
    }

    pluck(...topLevelOrNestedAttributes: (string | any)[]): GetMethod {
        /* Pluckable mixin implements this method */
        return this;
    }

    consistentRead(option: boolean): GetMethod {
        /* ConsistentReadable mixin implements this method */
        return this;
    }

    run(): Promise<DocumentClient.GetItemOutput> {
        return super.run();
    }
}

applyMixins(GetMethod, [Pluckable, ConsistentReadable]);

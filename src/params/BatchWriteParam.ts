import {Param, ValueMap, NameMap} from '../params/Param';

export default class BatchWriteParam implements Param {
  tableName: string;
  putItems: any[] = [];
  deleteKeys: any[] = [];
  key: string = 'RequestItems';

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  addPutItems(items: any[]) {
    this.putItems.push(...items);
  }

  addKeysToDelete(keys: any) {
    this.deleteKeys.push(...keys);
  }

  value(): RequestItems {
    let requestItems: RequestItems = {};
    requestItems[this.tableName] = [];
    const putRequests = this.buildPutRequests();
    const deleteRequests = this.buildDeleteRequests();
    requestItems[this.tableName].push(...putRequests, ...deleteRequests);
    return requestItems;
  }

  private buildPutRequests(): PutRequest[] {
    return this.putItems.map(item => {
      return new PutRequest(item);
    });
  }

  private buildDeleteRequests(): DeleteRequest[] {
    return this.deleteKeys.map(deleteKey => {
      return new DeleteRequest(deleteKey);
    });
  }

  safeValueMap(): ValueMap {
    return {};
  }

  safeNameMap(): NameMap {
    return {};
  }
}

export interface RequestItems {
  [tableName: string]: (DeleteRequest | PutRequest)[]
}

export class DeleteRequest {
  DeleteRequest: {
    Key: any; 
  }
  constructor(keyToDelete: any) {
    this.DeleteRequest = {
      Key: keyToDelete
    };
  }
}

export class PutRequest {
  PutRequest: any;
  constructor(item: any) {
    this.PutRequest = {};
    this.PutRequest.Item = item;
  }
}

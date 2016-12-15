import Condition from '../conditions/Condition';
import Attribute from '../conditions/Attribute';
import {NameMap, ValueMap} from '../expression';
import UpdateExpression from '../update/UpdateExpression';
import Dynaflo from '../';
import {docClient} from '../Dynaflo';

export abstract class Base {
  private _log: boolean = false;
  private tableName: string;
  private indexName?: string;
  private key?: Object;
  private item?: Object;
  private filterCondition?: Condition;
  private whenCondition?: Condition;
  private keyCondition?: Condition;
  private updateExpression?: UpdateExpression;
  private pluckAttributes?: Attribute[];
  abstract nameMap(): NameMap;
  abstract valueMap(): ValueMap;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private _params() {
    let params: Dynaflo.Params = {
      TableName: this.tableName,
      ReturnValues: 'NONE',
      ReturnItemCollectionMetrics: 'NONE'
    };
    this._assignIndexName(params);
    this._assignKey(params);
    this._assignItem(params);
    this.assignExpressions(params);
    this._assignExpressionNameMap(params);
    this._assignExpressionValueMap(params);
    return params;
  }

  private _assignIndexName(params: Dynaflo.Params) {
    if (this.indexName) {
      params.IndexName = this.indexName;
    }
  }

  private _assignKey(params: Dynaflo.Params) {
    if (this.key) {
      params.Key = this.key;
    }
  }

  private _assignItem(params: Dynaflo.Params): void{
    if (this.item) {
      params.Item = this.item;
    }
  }

  private assignExpressions(params: Dynaflo.Params): void {
    if (this.keyCondition) {
      params.KeyConditionExpression = this.keyCondition.exprString();
    }
    if (this.pluckAttributes) {
      params.ProjectionExpression = this.projectionExpression();
    }
    if (this.filterCondition) {
      params.FilterExpression = this.filterCondition.exprString();
    }
    if (this.whenCondition) {
      params.ConditionExpression = this.whenCondition.exprString();
    }
    if (this.updateExpression) {
      params.UpdateExpression = this.updateExpression.exprString();
    }
  }

  private _assignExpressionNameMap(params: Dynaflo.Params) {
    const nameMap: NameMap = this.nameMap();
    if (Object.keys(nameMap).length > 0) {
      params.ExpressionAttributeNames = nameMap;
    }
  }

  private _assignExpressionValueMap(params: Dynaflo.Params) {
    const valueMap: ValueMap = this.valueMap();
    if (Object.keys(valueMap).length > 0) {
      params.ExpressionAttributeValues = valueMap;
    }
  }

  run(method: string): Promise<any> {
    if (this._log) {
      console.log(this._params());
    }
    return new Promise((resolve, reject) => {
      docClient[method](this._params(), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  log() {
    this._log = true;
    return this;
  }
}

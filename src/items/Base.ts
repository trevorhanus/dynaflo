import ReturnConsumedCapacityEnum from '../modifiers';

export default class Base {
  TableName: string;
  ReturnValues: string = 'NONE';
  ReturnConsumedCapacity: ReturnConsumedCapacityEnum = 'TOTAL';
  ReturnItemCollectionMetrics: string = 'SIZE';

  constructor(tableName: string) {
    this.TableName = tableName;
  }

  get _params() {
    let params = {};
    Object.keys(this).forEach(key => {
      if (this[key]) {
        params[key] = this[key];
      }
    });
    return params;
  }
}

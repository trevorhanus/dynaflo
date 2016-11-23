import {Param} from '../params/ParamEnum';
import * as p from '../params';
import {docClient} from '../dynamoDb';
import Base from './Base';

export default class Put extends Base {
  item: Object;
  ReturnItemCollectionMetrics: p.ReturnItemCollectionMetrics = new p.ReturnItemCollectionMetrics();
  // ConditionExpression: string;

  constructor(tableName: string, item: Object) {
    super(tableName);
    this.item = item;
  }

  where(expression: string | Object) { // some_key >= some_other_key + 2
    return this;
  }

  returnItemCollectionMetrics(value: string): Put {
    this.ReturnItemCollectionMetrics.set(value);
    return this;
  }

  run(): Promise<any> {
    return super.run('put');
  }
}

const acceptedParamTypes: Param[] = [
  Param.TableName,
  Param.Item,
  Param.ConditionExpression,
  Param.ConditionalOperator,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.ReturnConsumedCapacity,
  Param.ReturnItemCollectionMetrics,
  Param.ReturnValues
];

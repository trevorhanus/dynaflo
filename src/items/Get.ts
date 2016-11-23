import {Param} from '../params/ParamEnum';
import {docClient} from '../dynamoDb';
import Base from './Base';
import * as p from '../params';
import {pluck} from '../modifiers';
import Attribute from '../conditions/Attribute';
import {getAttributesForPluckParams} from '../utils';

export default class Get extends Base {
  key: Object;
  pluckAttributes: Attribute[];

  constructor(tableName: string, key: Object) {
    super(tableName);
    this.key = key;
  }

  pluck(...topLevelOrNestedAttributes: (string|Object)[]) {
    this.pluckAttributes = getAttributesForPluckParams(topLevelOrNestedAttributes);
  }

  run(): Promise<any> {
    return super.run('get');
  }
}

const acceptedParamTypes: Param[] = [
  Param.TableName,
  Param.Key,
  Param.ProjectionExpression,
  Param.ExpressionAttributeNames,
  Param.ExpressionAttributeValues,
  Param.ConsistentRead,
  Param.ReturnConsumedCapacity
];

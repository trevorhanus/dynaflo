import {docClient} from '../dynamoDb';
import Base from './Base';
import Condition from '../conditions/Condition';
import Attribute from '../conditions/Attribute';
import {assign as _assign} from 'lodash';
import {getAttributesForPluckParams} from '../utils';

export default class Query extends Base {
  filterCondition: Condition;
  keyCondition: Condition;
  pluckAttributes: Attribute[];

  constructor(tableName: string) {
    super(tableName);
  }

  consistentRead() {

  }

  startAt() {

  }

  indexName() {
    // ????
  }

  where(keyCondition: Condition) {
    this.keyCondition = keyCondition;
  }

  filter(condition: Condition) {
    this.filterCondition = condition;
  }

  pluck(...topLevelOrNestedAttributes: (string|Object)[]) {
    this.pluckAttributes = getAttributesForPluckParams(topLevelOrNestedAttributes);
  }

  _expressionNameMap() {
    let nameMap = {};
    this.filterCondition && _assign(nameMap, this.filterCondition.nameMap());
    this.keyCondition && _assign(nameMap, this.keyCondition.nameMap());
    this.pluckAttributes.forEach(attribute => {
      _assign(nameMap, attribute.nameMap());
    });
    return nameMap;
  }

  _expressionValueMap() {
    let valueMap = {};
    this.filterCondition && _assign(valueMap, this.filterCondition.valueMap());
    this.keyCondition && _assign(valueMap, this.keyCondition.valueMap());
    return valueMap;
  }

  run(): Promise<any> {
    return super.run('query');
  }
}

import {Base} from './Base';
import Condition, {ConditionLike} from '../conditions/Condition';
import Attribute from '../conditions/Attribute';
import {assign as _assign} from 'lodash';
import {getAttributesForPluckParams} from '../utils';

export default class Query extends Base {
  private indexName?: string;
  private keyCondition: Condition;
  private filterCondition?: Condition;
  private pluckAttributes?: Attribute[];

  constructor(tableName: string, indexName?: string) {
    super(tableName);
    this.indexName = indexName;
  }

  startAt() {

  }

  whereKey(keyConditionOrAttributesToValueMap: ConditionLike) {
    if (keyConditionOrAttributesToValueMap instanceof Condition) {
      this.keyCondition = keyConditionOrAttributesToValueMap;
    } else {
      this.keyCondition = Condition.fromAttributesToValueMap(keyConditionOrAttributesToValueMap);
    }
    return this;
  }

  filter(condition: Condition) {
    this.filterCondition = condition;
    return this;
  }

  pluck(...topLevelOrNestedAttributes: (string|Object)[]) {
    this.pluckAttributes = getAttributesForPluckParams(topLevelOrNestedAttributes);
    return this;
  }

  run(): Promise<any> {
    return super.run('query');
  }

  private nameMap() {
    let nameMap = {};
    this.filterCondition && _assign(nameMap, this.filterCondition.nameMap());
    this.keyCondition && _assign(nameMap, this.keyCondition.nameMap());
    this.pluckAttributes && this.pluckAttributes.forEach(attribute => {
      _assign(nameMap, attribute.nameMap());
    });
    return nameMap;
  }

  private valueMap() {
    let valueMap = {};
    this.filterCondition && _assign(valueMap, this.filterCondition.valueMap());
    this.keyCondition && _assign(valueMap, this.keyCondition.valueMap());
    return valueMap;
  }
}

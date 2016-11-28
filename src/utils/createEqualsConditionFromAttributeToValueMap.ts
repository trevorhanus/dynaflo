import Condition from '../conditions/Condition';
import {forIn, isPlainObject, isNull, reduceRight, reduce} from 'lodash';

export default function createEqualsConditionFromAttributesToValueMap(attributesToValueMap: Object): Condition {
  // to create an equals condition from attributes to value map, we need to..
  // get all attribute paths and values from object
  const pathsToValue = getAttributePathsAndValues(attributesToValueMap);
  // iterate through the rest of the attibute paths and create an equals condition
  return reduceRight(pathsToValue, (condition, pathToValue) => {
    const parentCondition = createEqualsCondition(pathToValue);
    parentCondition.and(condition);
    return parentCondition;
  }, null);
}

export function getAttributePathsAndValues(attributesToValueMap: Object) {

  const nestedObjectToValues: Object[] = [];
  recurse(attributesToValueMap, []);
  return nestedObjectToValues;

  function recurse(attributesToValueMap: Object, path: string[]) {
    forIn(attributesToValueMap, (value, key) => {
      const isObject = isPlainObject(value);
      const notNull = !isNull(value);
      if (isObject && notNull) {
        recurse(value, path.concat(key));
      } else {
        nestedObjectToValues.push({
          value: value,
          nestedObject: nestedAttributeFromPath(path.concat(key))
        });
      }
    });
  }
}

export function nestedAttributeFromPath(path: string[]) {
  return reduceRight(path, (nested, key) => {
    let parent = {};
    parent[key] = nested;
    return parent;
  }, true);
}

export function createEqualsCondition(pathToValue: Object) {
  const condition = new Condition(pathToValue.nestedObject);
  condition.eq(pathToValue.value);
  return condition;
}

import * as utils from '../../src/utils';
import createEqualsConditionFromAttributeToValueMap from '../../src/utils/createEqualsConditionFromAttributeToValueMap';
import {nestedAttributeFromPath} from '../../src/utils/createEqualsConditionFromAttributeToValueMap';
import {getAttributePathsAndValues} from '../../src/utils/createEqualsConditionFromAttributeToValueMap';

describe('Create Equals Condition From Attribute To Value Map', () => {

  beforeAll(() => {
    utils.getSafeExpressionName = getSafeExpressionNameMock();
    utils.getSafeExpressionValue = getSafeExpressionValueMock();
  });

  it('Nested Attribute From Path', () => {
    const path = ['key1', 'key2'];
    const nested = nestedAttributeFromPath(path);
    expect(nested).toEqual({key1: {key2: true}});
  });

  it('Attribute Paths And Values', () => {
    const attributesToValueMap = {key1: 'value1', key2: ['item1']};
    const pathsToValue = getAttributePathsAndValues(attributesToValueMap);
    expect(pathsToValue[0]).toEqual({value: 'value1', nestedObject: {key1: true}});
    expect(pathsToValue[1]).toEqual({value: ['item1'], nestedObject: {key2: true}});
  });

  it('Attribute Paths And Values nested', () => {
    const attributesToValueMap = {
      key1: {
        key2: {
          key3: false
        }
      }
    };
    const pathsToValue = getAttributePathsAndValues(attributesToValueMap);
    expect(pathsToValue[0]).toEqual({value: false, nestedObject: {key1: {key2: {key3: true}}}});
    expect(pathsToValue[1]).toBeUndefined();
  });

  it('Creates chained and condition', () => {
    const attributesToValueMap = {key1: 'value1', key2: ['item1']};
    let condition = createEqualsConditionFromAttributeToValueMap(attributesToValueMap);
    const expectedString = '( #name2 = :value2 AND ( #name1 = :value1 ) )';
    expect(condition.exprString()).toBe(expectedString);
  });
});

function getSafeExpressionNameMock() {
  let counter = 1;
  return () => {
    return '#name' + counter++;
  }
}

function getSafeExpressionValueMock() {
  let counter = 1;
  return () => {
    return ':value' + counter++;
  }
}

import {Param, ValueMap, NameMap} from '../params/Param';
import Attribute from '../conditions/Attribute';
import {getAttributesForPluckParams} from '../utils';
import {assign as _assign} from 'lodash';
import {isEmpty as _isEmpty} from 'lodash';

export default class PluckParam implements Param {
  private pluckAttributes: Attribute[];
  key: string = 'ProjectionExpression';

  constructor(topLevelOrNestedAttributes: (string|any)[]) {
    if (_isEmpty(topLevelOrNestedAttributes)) { throw new PluckError('Must pass at least one attribute to pluck.'); }
    this.pluckAttributes = getAttributesForPluckParams(topLevelOrNestedAttributes);
  }

  value(): string {
    let namePaths: string[] = this.pluckAttributes.map(attr => {
      return attr.safePath();
    })
    return namePaths.join(', ');
  }

  safeValueMap(): ValueMap {
    return {}; // no values with projection expression
  }

  safeNameMap(): NameMap {
    let nameMap = {};
    this.pluckAttributes && this.pluckAttributes.forEach(attr => {
      _assign(nameMap, attr.nameMap());
    });
    return nameMap;
  }
}

export class PluckError extends Error {
  name: string = 'PluckError';
  constructor(message: string) {
    super(message);
  }
}

import Base from './Base';
import Attribute from '../conditions/Attribute';
import {getAttributesForPluckParams} from '../utils';
import {assign as _assign} from 'lodash';

export default class Get extends Base implements dn.iExpressionMaps, dn.pluckable {
  pluckAttributes: Attribute[];

  constructor(tableName: string, key: Object) {
    super(tableName);
    this.key = key;
  }

  pluck(...topLevelOrNestedAttributes: (string | Object)[]) {
    if (this.pluckAttributes) { 
      throw new GetError('Cannot call pluck twice. Combined the calls into one.'); 
    }
    if (topLevelOrNestedAttributes.length === 0) { 
      throw new GetError('Attributes must be passed to .pluck'); 
    }
    this.pluckAttributes = getAttributesForPluckParams(topLevelOrNestedAttributes);
    return this;
  }

  projectionExpression() {
    const namePaths: string[] = [];
    this.pluckAttributes.forEach(attr => {
      namePaths.push(attr.safePath());
    });
    return namePaths.join(', ');
  }

  nameMap(): dn.NameMap {
    let nameMap = {};
    this.pluckAttributes && this.pluckAttributes.forEach(attr => {
      _assign(nameMap, attr.nameMap());
    });
    return nameMap;
  }

  valueMap(): dn.ValueMap {
    const noValueMap = {};
    return noValueMap;
  }

  run(): Promise<any> {
    return super.run('get');
  }
}

export class GetError extends Error {}

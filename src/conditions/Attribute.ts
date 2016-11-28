import {getSafeExpressionName} from '../utils';

export default class Attribute implements dn.Attribute {
  tokens: string[] = [];
  safeTokens: string[] = [];
  _nameMap: dn.NameMap = {};

  constructor(attribute: string | Object) {
    switch (typeof attribute) {
      case 'string': // single token
        this.tokens.push(attribute);
        this.createSafeNamesForTokens();
        break;
      case 'object':
        this.extractTokensFromNestedObject(attribute);
        this.createSafeNamesForTokens();
        break;
      default:
        throw new AttributeError('Could not handle attribute: ' + JSON.stringify(attribute));
    }
  }

  safePath(): string {
    return this.safeTokens.join('.');
  }

  nameMap(): dn.NameMap {
    return this._nameMap;
  }

  extractTokensFromNestedObject(attributeMap: Object) {
    const self = this;
    nextLevel(attributeMap);

    function nextLevel(map: Object) {
      Object.keys(map).forEach(key => {
        self.tokens.push(key);
        if (map[key] === true) {
          return;
        } else if (Array.isArray(map[key])) {
          throw new AttributeError('Attribute must be a single path.')
        } else {
          nextLevel(map[key]);
        }
      });
    }
  }

  createSafeNamesForTokens() {
    this.tokens.forEach(token => {
      const safeName = getSafeExpressionName();
      this.safeTokens.push(safeName);
      this._nameMap[safeName] = token;
    });
  }
}

export class AttributeError extends Error {}


/*
.where(condition | equalsMap): Condition -> a condition has only one attribute, the value is in the comparator
.when(condition | equalsMap): Condition
.pluck(attributeOrNestedAttribute[, attributeOrNestedAttribute[, ...]]) -> has multiple attributes, no values
attr(attribute)

// equalsMap
{
  key1: true,
  key2: {
    key3: 'string',
    key4: ['item1', 'item2']
  },
  key5: 10
}

// attribute
// can be a string to a topLevel attribute or
// an object to a nested attribute
{
  key1: {
    key2: {
      key3: true
    }
  }
}

// Shorthand
// an attributeDescription is shorthand if one of the values is an array
{
  key1: ['key2', 'key3']
}

Attribute.createMultipleFromMap() // takes a nestedAttributeDescription or shorthand and returns an array of attributes
*/
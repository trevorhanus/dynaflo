import {getSafeExpressionName} from '../utils';

export default class Attribute {
  tokens: string[] = [];
  safeTokens: string[] = [];
  tokenMap: Object = {};

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
      this.tokenMap[safeName] = token;
    });
  }

  get safePath() {
    return this.safeTokens.join('.');
  }
}

export class AttributeError extends Error {}

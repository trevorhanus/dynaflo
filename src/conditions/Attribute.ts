import Dynaflo from '..';
import {NameMap} from '../interfaces';
import {getSafeExpressionName} from '../utils';

export default class Attribute {
  private tokens: string[] = [];
  private safeTokens: string[] = [];
  private _nameMap: NameMap = {};

  constructor(attribute: AttributeLike) {
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

  nameMap(): NameMap {
    return this._nameMap;
  }

  private extractTokensFromNestedObject(attributeMap: any) {
    const self = this;
    nextLevel(attributeMap);

    function nextLevel(map: any) {
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

  private createSafeNamesForTokens() {
    this.tokens.forEach(token => {
      const safeName = getSafeExpressionName();
      this.safeTokens.push(safeName);
      this._nameMap[safeName] = token;
    });
  }
}

export type AttributeLike = (string | any);

export class AttributeError extends Error {
  public name = 'AttributeError';
  constructor(message: string) {
    super(message);
  }
}

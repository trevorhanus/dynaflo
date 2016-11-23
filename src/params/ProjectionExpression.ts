import ExpressionAttributeNames from './ExpressionAttributeNames';
import {Param} from './ParamEnum';
import {getSafeExpressionName} from '../utils';

export default class ProjectionExpression {
  paramType: Param = Param.ProjectionExpression;
  _projectionExpressionList: string[] = [];
  expressionNameMap: ExpressionAttributeNames;


  constructor(expressionAttributeNames: ExpressionAttributeNames) {
    this.expressionNameMap = expressionAttributeNames;
  }

  private applyAttributes(attributes: (string | Object)[]): void {
    attributes.forEach(attribute => {
      switch (typeof attribute) {
        case 'string':
          this.createSafeKeyAndSetPairInExpressionMap(attribute);
          break;
        case 'object':
          this.walkThroughNestedObject(attribute);
          /* noop right now */
          break;
        default:
          throw new PluckError('Could not handle attribute: ' + JSON.stringify(attribute));
      }
    });
  }

  private createSafeKeyAndSetPairInExpressionMap(attribute: string): void {
    const safeExpressionName = getSafeExpressionName();
    this._projectionExpressionList.push(safeExpressionName);
    this.expressionNameMap.add(safeExpressionName, attribute);
  }

  private walkThroughNestedObject(attributeMap: Object) {
    const self = this;
    recursive(attributeMap, []);

    function recursive(map: Object, nameChain: string[]) {
      Object.keys(map).forEach(key => {
        const safeName = getSafeExpressionName();
        self.expressionNameMap.add(safeName, key);
        nameChain = nameChain.concat(safeName);
        if (map[key] === true) {
          self._projectionExpressionList.push(nameChain.join('.'));
          return;
        } else if (Array.isArray(map[key])) {
          addListOfNames(map[key], nameChain);
        } else {
          recursive(map[key], nameChain);
        }
      });
    }

    function addListOfNames(list: string[], nameChain: string[]) {
      list.forEach(name => {
        const safeName = getSafeExpressionName();
        self.expressionNameMap.add(safeName, name);
        self._projectionExpressionList.push(nameChain.concat(safeName).join('.'));
      });
    }
  }

  toJS(): string {
    return this._projectionExpressionList.join(', ');
  }
}

export class PluckError extends Error {}


/*
doc structure
{
  top1: {
    nested1: 'derp'
  },
  top2: {
    nested2: 'climb',
    nested3: 10
  }
}

attributeMap - long
{
  top1: {
    nested1: true
  },
  top2: {
    nested2: true,
    nested3: true
  }
}

attributeMap - shorthand 
{
  top1: {
    nested1: true
  },
  top2: ['nested2', 'nested3']
}

output: 
['top1.nested1']

what do we need to do?
initiate the name 

call recursive function('');

recursive function (object, nameChain) '#hasdfe.#asdfhhe' 
  // loop through the keys of the object
  // get a safe Expression Name for the key
  // add the safe expression name to the map
  // add the safe name to the chain
  if (the value of the key is true) {
    add the chain to the list
    return
  } else {
    // we need to go to the next level down
    call resursive function (object, nameChain)
  }
*/

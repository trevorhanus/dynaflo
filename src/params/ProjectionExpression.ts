import ExpressionAttributeNames from './ExpressionAttributeNames';
import {Param} from './ParamEnum';
import {getSafeExpressionName} from '../utils';

export default class ProjectionExpression {
  paramType: Param = Param.ProjectionExpression;
  _projectionExpressionList: string[] = [];
  expressionNameMap: ExpressionAttributeNames;


  constructor(expressionAttributeNames: ExpressionAttributeNames, attributes: (string | Object)[]) {
    // ['My.Scalar.Key', {'MyMap': {'MyKey': true, 'MyKey2': true}}, 'MyArray[1]']
    this.expressionNameMap = expressionAttributeNames;
    this.parseAttributes(attributes);
  }

  private parseAttributes(attributes: (string | Object)[]): void {
    attributes.forEach(attribute => {
      switch (typeof attribute) {
        case 'string':
          this.createSafeKeyAndSetPairInExpressionMap(attribute);
          break;
        case 'object':

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

  toJS(): string {
    return this._projectionExpressionList.join(', ');
  }
}

export class PluckError extends Error {}
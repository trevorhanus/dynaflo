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

  toJS(): string {
    return this._projectionExpressionList.join(', ');
  }
}

export class PluckError extends Error {}

import * as p from '../params';

export default function pluck(...attributes: (string | Object)[]): Get {
  if (!this.ExpressionAttributeNames) {
    this.ExpressionAttributeNames = new p.ExpressionAttributeNames();
  }
  if (!this.ProjectionExpression) {
    this.ProjectionExpression = new p.ProjectionExpression(this.ExpressionAttributeNames);
  }
  this.ProjectionExpression.applyAttributes(attributes);
  return this;
}

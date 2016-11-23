import * as p from '../params';

export default function pluck(...attributes: (string | Object)[]) {
  if (!attributes || attributes.length <= 0) {
    throw new PluckError('Nothing was passed into pluck.');
  }
  if (!this.ExpressionAttributeNames) {
    this.ExpressionAttributeNames = new p.ExpressionAttributeNames();
  }
  if (!this.ProjectionExpression) {
    this.ProjectionExpression = new p.ProjectionExpression(this.ExpressionAttributeNames);
  }
  this.ProjectionExpression.applyAttributes(attributes);
  return this;
}

export class PluckError extends Error {}


// - items


// - conditions
//   Condition
//   Attribute
//   - comparators
//     Base
//     LessThan
//     GreaterThan
    
// - modifiers
//   pluck()
//   where()
//   filter()
//   limit()
//   startAt()
//   consistentRead()
//   returnConsumedCapacity()


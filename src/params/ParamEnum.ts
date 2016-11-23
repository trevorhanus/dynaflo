export enum Param {
  TableName,
  Key, // passed as param in .get(key) .update(key) and .delete(key)
  Item, // passed as param in .put(item)
  IndexName, // passed in query or scan ???
  ConditionExpression, // .put().where(Condition), .put().where(Condition), .update(), or .delete()
  ProjectionExpression, // .pluck() on any method
  UpdateExpression, // .update().where(Condition)
  KeyConditionExpression, // .if(object) ?????
  FilterExpression, // .filter()
  ExpressionAttributeNames, // comes from .where(), .pluck(), .update().where(), .filter()
  ExpressionAttributeValues, // gets appended to whenever an expression param is added
  Select, // .select() ??????
  Limit, // .limit(number) after .query() or .scan()
  ScanIndexForward,
  ExclusiveStartKey, // .startAt(object) after a call to .query() or .scan()
  ConsistentRead, // .consistentRead(boolean)
  ReturnConsumedCapacity, // .consumedCapacity(string)
  ReturnItemCollectionMetrics,
  ReturnValues, // on an update dynamoDb will return values in the response
  Segment,
  TotalSegments
  // ConditionalOperator, Legacy use ConditionExpression
  // KeyConditions, Legacy use KeyConditionExpression instead
  // QueryFilter, Legacy use FilterExpression instead
  // AttributesToGet, Legacy use ProjectionExpression instead
  // ScanFilter, Legacy use FilterExpression instead
  // Expected, Legacy use ConditionExpression instead
  // AttributeUpdates, Legacy use UpdateExpression instead
}

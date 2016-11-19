export enum Param {
  TableName,
  Key, // passed as param in .get(key) .update(key) and .delete(key)
  Item, // passed as param in .put(item)
  IndexName,
  ConditionExpression, // .if(object) after a call to .put(), .update(), or .delete()
  ConditionalOperator,
  ProjectionExpression,
  UpdateExpression,
  KeyConditionExpression, // .if(object) ?????
  FilterExpression, // .filter()
  ExpressionAttributeNames, // gets appended to whenever an expression param is added
  ExpressionAttributeValues, // gets appended to whenever an expression param is added
  Select, // .select() ??????
  Limit, // .limit(number) after .query() or .scan()
  ScanIndexForward,
  ExclusiveStartKey, // .startAt(object) after a call to .query() or .scan()
  ConsistentRead, // .consistentRead(boolean)
  ReturnConsumedCapacity, // .consumedCapacity(string)
  ReturnItemCollectionMetrics,
  ReturnValues,
  Segment,
  TotalSegments
  // KeyConditions, Legacy use KeyConditionExpression instead
  // QueryFilter, Legacy use FilterExpression instead
  // AttributesToGet, Legacy use ProjectionExpression instead
  // ScanFilter, Legacy use FilterExpression instead
  // Expected, Legacy use ConditionExpression instead
  // AttributeUpdates, Legacy use UpdateExpression instead
}

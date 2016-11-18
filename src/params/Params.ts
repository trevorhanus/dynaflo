let KeyParam: Object;
let TableNameParam: string;

export class Params {
  Key: Object; /* get, update, delete, */ // passed as param in .get(key) .update(key) and .delete(key)
  TableName: string; /* get, put, query, scan, update, delete, */ // passed as param to the constructor, or .table(tableName) method
  Item: PutItemParam; /* put */ // passed as a param in .put(item)
  ConditionExpression: string; /* put, update, delete */ // passed in during a call to .where(object) method after a call to .put(), .update(), or .delete() or this could be .if()
  ExclusiveStartKey: string; /* query, scan */ // .startAt(object) after a call to .query() or .scan()
  FilterExpression: string; /* query, scan */ // .filter()
  KeyConditionExpression: string; /* query */ // passed in during a call to the .where(object) method
  Limit: number; /* query, scan */ // .limit()
  ExpressionAttributeNames: Object; /* get, put, query, scan, update, delete */
  ExpressionAttributeValues: Object; /* put, query, scan, update, delete */
  ProjectionExpression: string; /* get, query, scan */ // .attrs() determines what attributes are returned
  ReturnConsumedCapacity: 'INDEXES | TOTAL | NONE' /* put, query, scan, update, delete */
  ReturnItemCollectionMetrics: 'SIZE | NONE' /* put, update, delete */
  ReturnValues: 'NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW'; /* put, update, delete */
  ConsistentRead: boolean; /* get, query, scan */
  Select: 'ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | SPECIFIC_ATTRIBUTES | COUNT'; /* query, scan */
  Segment: number; /* scan */ // NOT SUPPORTED
  TotalSegements: number; /* scan */ // NOT SUPPORTED
  IndexName: string; /* query, scan */ // NOT SUPPORTED
  ScanIndexForward: boolean /* query */ // NOT SUPPORTED
  ConditionalOperator: 'AND | OR'; /* put, query, scan, update, delete */ // NOT SUPPORTED ?? what is this?
  UpdateExpression: string; /* update */ // NOT SUPPORTED
  // KeyConditions: Object; /* query */ // this is a legacy param, use KeyConditionExpression
  // QueryFilter: Object; /* query, */ // => This is a legacy param, use FilterExpression
  // AttributesToGet: string[]; /* get, query, scan */ this is a legacy param, use ProjectionExpression
  // ScanFilter: Object; /* scan */ // NOT SUPPORTED this is legacy, use FilterExpression
  // Expected: Object; /* put, update, delete */ this is legacy, use ConditionExpression
  // AttributeUpdates: Object; /* update */ // this is legacy param, use UpdateExpression 
}

const enum ReturnItemCollectionMetricsEnum {
  Size,
  None
}

const movies = dynanode.table('Movies');

movies
  .get(Params.Key)
  .project()
  .attrs(string[])
  // settings
  .run()
  .then();

movies
  .put(Params.Item)
  .if(Params.ConditionExpression)
  // settings
  .return('NONE | ALL_OLD')
  .consumedCapacity('INDEXES | TOTAL | NONE')
  .itemCollectionMetrics('SIZE | NONE');

movies
  .query()
  .attrs(string[])
  .startAt(Params.ExclusiveStartKey)
  .filter(Params.FilterExpresssion) // What is Params.QueryFilter
  .between(Params.KeyConditionExpression) // NOT SUPPORTED
  .where(Params.KeyConditionExpression)
  .if(Params.KeyConditionExpression)
  .limit(Params.Limit)
  .project(Params.ProjectionExpression)
  // settings
  .select('ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | SPECIFIC_ATTRIBUTES | COUNT')
  .consumedCapacity('INDEXES | TOTAL | NONE')
  .consistentRead(boolean)
  .run()
  .then();

movies
  .scan()
  .attrs(string[])
  .startAt(Params.ExclusiveStartKey)
  .filter(Params.FilterExpression) // What is Params.ScanFilter
  .limit(Params.Limit)
  .project(Params.ProjectionExpression)
  // settings
  .select('ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | SPECIFIC_ATTRIBUTES | COUNT')
  .consumedCapacity('INDEXES | TOTAL | NONE')
  .consistentRead(boolean)
  .run()
  .then();

movies
  .update(Params.Key)
  .add(Params.AttributeUpdates)
  .set(Params.AttributeUpdates)
  .put(Params.AttributeUpdates)
  .inc() // increments a number, not supported yet
  .delete(Params.AttributeUpdates)
  .if(Params.ConditionExpression)
  // settings
  .consumedCapacity('INDEXES | TOTAL | NONE')
  .itemCollectionMetrics('SIZE | NONE')
  .return('NONE | ALL_OLD')
  .run()
  .then();

movies
  .delete(Params.Key)
  .if(Params.ConditionExpression)
  // settings
  .return('NONE | ALL_OLD')
  .consumedCapacity('INDEXES | TOTAL | NONE')
  .itemCollectionMetrics('SIZE | NONE')
  .run()
  .then();

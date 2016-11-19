import {Param} from './ParamEnum';

export default {
  update: [
    Param.TableName, // Base
    Param.Key,
    Param.UpdateExpression,
    Param.ConditionExpression,
    Param.ConditionalOperator,
    Param.Expected,
    Param.ExpressionAttributeNames,
    Param.ExpressionAttributeValues,
    Param.ReturnConsumedCapacity,
    Param.ReturnItemCollectionMetrics,
    Param.ReturnValues
  ],
  query: [
    Param.TableName, // Base
    Param.IndexName,
    Param.ConditionalOperator,
    Param.ConsistentRead,
    Param.ExclusiveStartKey,
    Param.ExpressionAttributeNames,
    Param.ExpressionAttributeValues,
    Param.FilterExpression,
    Param.KeyConditionExpression,
    Param.KeyConditions,
    Param.Limit,
    Param.ProjectionExpression,
    Param.ReturnConsumedCapacity,
    Param.ScanIndexForward,
    Param.Select
  ],
  scan: [
    Param.TableName, // Base
    Param.IndexName,
    Param.ConditionalOperator,
    Param.ExclusiveStartKey,
    Param.ExpressionAttributeNames,
    Param.ExpressionAttributeValues,
    Param.FilterExpression,
    Param.ProjectionExpression,
    Param.Limit,
    Param.ConsistentRead,
    Param.Segment,
    Param.Select,
    Param.TotalSegments,
    Param.ReturnConsumedCapacity
  ],
  delete: [
    Param.TableName, // Base
    Param.Key,
    Param.ConditionExpression,
    Param.ConditionalOperator,
    Param.Expected,
    Param.ExpressionAttributeNames,
    Param.ExpressionAttributeValues,
    Param.ReturnConsumedCapacity,
    Param.ReturnItemCollectionMetrics,
    Param.ReturnValues
  ]
}

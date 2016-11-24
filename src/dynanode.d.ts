declare module dn {

  interface iExpressionMaps {
    nameMap(): Object;
    valueMap(): Object;
  }

  interface NameMap {
    [safeName: string]: string;
  }

  interface ValueMap {
    [safeValue: string]: (string | boolean | number);
  }

  interface Params {
    TableName: string;
    Key?: Object;
    Item?: Object;
    FilterExpression?: string;
    ConditionExpression?: string;
    ExpressionAttributeNames?: NameMap;
    ExpressionAttributeValues?: ValueMap;
    ReturnConsumedCapacity?: ReturnConsumedCapacityOptions;
    ReturnValues?: ReturnValuesOptions;
  }

  type ReturnConsumedCapacityOptions = 'INDEXES' | 'TOTAL' | 'NONE';
  type ReturnValuesOptions = 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW'
  type ReturnItemCollectionMetrics = 'SIZE' | 'NONE';

  interface Attribute {
    nameMap(): NameMap;
    safePath(): string;
  }

  interface Comparator {
    exprString(safePath?: string): string;
    valueMap(): ValueMap;
  }

  interface Operand {
    exprString(): string;
    valueMap(): ValueMap;
  }

  interface Condition {
    attribute: Attribute;
    comparator: Comparator;
    andCondition?: Condition;
    orCondition?: Condition;
    nameMap(): NameMap;
    valueMap(): ValueMap;
    or(condition: Condition): Condition;
    and(condition: Condition): Condition;
    exprString(): string;
  }

  interface pluckable {
    pluck(...topLevelOrNestedAttributes: (string | Object)[]): void;
    projectionExpression(): string;
  }

  interface whereable {
    whereCondition?: Condition;
    where(condtion: Condition): void;
  }
}

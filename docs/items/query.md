A Query operation uses the primary key of a table or a secondary index to directly access items from that table or index.
[AWS.DynamoDB.DocumentClient.query()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)

**Command Syntax**
```
table.get(key: Object) -> singleDoc
```

Where `key` is a pojo that represents the primary key for the item.

For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.

**Usage**

```javascript
dn.table('Movies')
  .query([indexName])
  .whereKey(keyCondition)
  .filter()
  .pluck('year', 'title', 'rating') // optional. defaults to everything
  .limit()
  .run()
  .then(data => {
    console.log(data.Item); // Item will only have year, title, and rating attributes
  });
```

**Available Modifiers**

[.consistentRead()](/params/consistentRead.md) <br>
[.returnConsumedCapacity()](/params/consumedCapacity.md)

**AWS Docs Links**

[DocumentClient](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property) <br>
[DynamoDB API](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)


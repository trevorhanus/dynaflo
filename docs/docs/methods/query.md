Queries the primary key of a table or a secondary index to directly access items from that table or index.

**Command Syntax**
```
table.query([indexName: string])
  .whereKey(key: Object)
```

Where `key` is a pojo that represents the primary key for the item.

For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.

**Usage**

```javascript
d.table('Movies')
  .query([indexName])
  .whereKey(keyCondition)
  .filter() // filter condition to perform after the query has executed, but before the items are returned from DynamoDB
  .pluck('year', 'title', 'rating') // optional. defaults to everything
  .limit()
  .run()
  .then(data => {
    console.log(data.Items); // Items will only have year, title, and rating attributes
  });
```

**Available Modifiers**

[.filter()](/modifiers/filter.md) <br>
[.pluck()](/modifiers/pluck.md) <br>
[.limit()]()

**AWS Docs Links**

[DocumentClient.query()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property) <br>
[DynamoDB API Query](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)


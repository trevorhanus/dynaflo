**Command Syntax**
```
table.get(key: Object) -> singleDoc
```

Where `key` is a pojo that represents the primary key for the item.

For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.

For more see the [AWS Docs](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html)

**Description**

Returns a set of attributes for the item with the given primary key by delgating to
[AWS.DynamoDB.DocumentClient.get()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)

**Usage**

```javascript
dn.table('Movies')
  .get({year: 2015, title: 'The Big New Movie'})
  .pluck('year', 'title', 'rating') // optional. defaults to everything
  .run()
  .then(data => {
    console.log(movie.title);
  });
```

**Available Modifiers**

[.pluck()](/modifiers/pluck.md) <br>
[.consistentRead()](/params/consistentRead.md) <br>
[.returnConsumedCapacity()](/params/consumedCapacity.md)

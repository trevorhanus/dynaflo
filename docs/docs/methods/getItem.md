Returns a set of attributes for the item with the given primary key.

**Command Syntax**
```
table.get(key: Object) -> singleDoc
```

TODO: find the language used by Dynamo on the key

Where `key` is a pojo that represents the primary key for the item.

For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.

**Usage**

```javascript
d.table('Movies')
  .get({year: 2015, title: 'The Big New Movie'})
  .pluck('year', 'title', 'rating') // optional. defaults to everything
  .run()
  .then(data => {
    console.log(data.Item); // Item will only have year, title, and rating attributes
  });
```

**Available Modifiers**

[.pluck()](/modifiers/pluck.md) <br>

**AWS Documentation Links**

[DocumentClient.get()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property) <br>
[DynamoDB API GetItem](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html)

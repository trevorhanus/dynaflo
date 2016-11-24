Creates a new item, or replaces an old item with a new item by delegating to [AWS.DynamoDB.DocumentClient.put()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)

**Command Syntax**
```
table.put(item: Object)
```

Where `item` is a pojo that represents the doc to be inserted.

**Usage**

```javascript
const movies = new dn.Table('Movies');
movies
  .put({
    year: 2013,
    title: 'Turn It Down, Or Else!',
    info: {
      plot: 'Nothing happens at all.',
      rating: 0
    }
  })
  .run()
  .then(data => {
    // Inserted a new item
  });
```

Or we could conditionally put an item.

```javascript
const movies = new dn.Table('Movies');
movies
  .put({
    id: '1234',
    info: {
      plot: 'Nothing happens at all.',
      rating: 0
    }
  })
  .where(dn.attr('id').notExists())
  .run()
  .then(data => {
    // Only inserts the item if there is not a doc with id = '1234' already
  });
```

**Available Modifiers**

[.where()](/modifiers/where.md) <br>
[.returnConsumedCapacity()](/params/consumedCapacity.md) <br>

For more see the [AWS Docs](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html)
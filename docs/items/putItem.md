Creates a new item, or replaces an old item with a new item.

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
  .when(dn.attr('id').notExists())
  .run()
  .then(data => {
    // Only inserts the item if there is not a doc with id = '1234' already
  });
```

**Available Modifiers**

[.when()](/modifiers/where.md) <br>
[.returnConsumedCapacity()](/params/consumedCapacity.md) <br>

**AWS Documentation Links**

[DocumentClient.put()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property) <br>
[DynamoDB API PutItem](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html)
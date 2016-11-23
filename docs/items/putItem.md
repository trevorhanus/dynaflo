**.put()**

Creates a new item, or replaces an old item with a new item by delegating to [AWS.DynamoDB.DocumentClient.put()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)

**Usage**

```javascript
import dn from 'dynanode';
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

**Available Modifiers**

[.where()](/modifiers/where.md) <br>
[.returnConsumedCapacity()](/params/consumedCapacity.md) <br>

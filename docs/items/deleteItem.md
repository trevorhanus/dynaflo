**.delete()**

Deletes the item with the given primary key by delgating to
[AWS.DynamoDB.DocumentClient.delete()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property)

**Usage**

```javascript
import dn from 'dynanode';

dn.table('Movies')
  .delete({year: 2015, title: 'The Big New Movie'})
  .run()
  .then(data => {
    console.log(movie.title);
  });
```

**Available Modifiers**

[.where()](/modifiers/pluck.md) <br>
[.returnConsumedCapacity()](/params/consumedCapacity.md) <br>
[.returnValues()]()

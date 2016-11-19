**.get()**

Returns a set of attributes for the item with the given primary key by delgating to
[AWS.DynamoDB.DocumentClient.get()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)

**Usage**

```javascript
import dn from 'dynanode';

dn.table('Movies')
  .get({year: 2015, title: 'The Big New Movie'})
  .attrs('year, title, rating') // optional. defaults to everything
  .run()
  .then(data => {
    console.log(movie.title);
  });
```

**Available Modifiers**

[.attrs()](/params/attrs.md) <br>
[.consistentRead()](/params/consistentRead.md) <br>
[.returnConsumedCapacity()](/params/consumedCapacity.md)

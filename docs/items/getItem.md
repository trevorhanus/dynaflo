**.get()**

Returns a set of attributes for the item with the given primary key.

**Usage**

```javascript
import dn from 'dynanode';

dn.table('Movies')
  .get({year: 2015, title: 'The Big New Movie'})
  .attrs('year, title, rating')
  .run()
  .then((movie, metadata) => {
    console.log(movie.title);
  });
```

**Available Modifiers**

[.attrs()](/modifiers/attrs.md) <br>
[.consistentRead()](/modifiers/consistentRead.md)

**AWS Document Client reference**

[AWS.DynamoDB.DocumentClient.get()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)
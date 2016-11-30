Set new attributes or update old ones

**Command Syntax**
```
table.update(key: Object)
  .set(item: Object)
  .remove(keyName | {nested: path}[, keyName | {nested: path}])
  .delete(topLevelKeyName, [itemsToDelete])
```

Where `key` is a pojo that represents the primary key to be deleted.

For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.

**Usage**

Set

```javascript
const f = new Fluent(config);

const movies = new f.Table('Movies');
movies.update({year: 2015, title: 'The Big New Movie'})
  .set({
    info: {
      rating: 5.5,
      plot: 'Everything happens all at once',
      actors: ['Larry', 'Moe', 'Curly']
    }
  })
  .run()
  .then(data => {
    // movie is updated
  });
```

Conditionally set an item

```javascript
import dn, {attr} from 'fluent-for-dynamodb';

const movies = new f.Table('Movies');
movies.update({id: '1234'})
  .set({
    info: {
      rating: 5.5,
      plot: 'Everything happens all at once',
      actors: ['Larry', 'Moe', 'Curly']
    }
  })
  .when(attr({info:{plot:true}}).startsWith('Every'))
  .run()
  .then(data => {
    // will update if the plot starts with the substring 'Every'. So in this case 
    // it will update
  });
```

Delete items from a set.

```javascript
import dn, {attr} from 'fluent-for-dynamodb';

const movies = new f.Table('Movies');
movies.update({id: '1234'})
  .delete('topLevelSet', ['Item3'])
  .run()
  .then(data => {
    // deletes 'item3' from the top level set named 'topLevelSet' 
  });
```

*Note: delete only works with sets and top level attributes.*

Remove attributes from items

```javascript
import dn, {attr} from 'fluent-for-dynamodb';

const movies = new f.Table('Movies');
movies.update({id: '1234'})
  .remove('topLevelKey', {info:{rating:true}})
  .run()
  .then(data => {
    // removed attribute 'topLevelKey' and the info.rating attribute 
  });
```

**Available Modifiers**

[.when()](/modifiers/when.md) <br>

For more see the [AWS Docs](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)

AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
```

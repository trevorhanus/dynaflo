Deletes the item with the given primary key.

**Command Syntax**
```
table.delete(key: Object)
```

Where `key` is a pojo that represents the primary key to be deleted.

For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.

**Usage**

```javascript
d.table('Movies')
  .delete({year: 2015, title: 'The Big New Movie'})
  .run()
  .then(data => {
    console.log(movie.title);
  });
```

Here `year` is the partion key and `title` is the sort key.

We can also conditionally delete items.

```javascript
d.table('Movies')
  .delete({year: 2015, title: 'The Big New Movie'})
  .when(d.attr({info:{rating:true}}).lt(5.0))
  .run()
  .then(data => {
    // movie was deleted
  })
  .catch(err => {
    // the movie was not deleted
  });
```

This deletes the movie if the rating is less than 5.0.

**Available Modifiers**

[.when()](/modifiers/when.md) <br>

**AWS Documentation Links**

[DocumentClient.delete()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property) <br>
[DynamoDB API DeleteItem](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html)
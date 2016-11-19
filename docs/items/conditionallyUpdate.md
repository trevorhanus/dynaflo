Update 

AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

// Conditional update (will fail)

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "remove info.actors[0]",
    ConditionExpression: "size(info.actors) > :num",
    ExpressionAttributeValues:{
        ":num":3
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

Dynanode

```javascript
const movies = new dn.Table('Movies');
movies.update({year: 2015, title: 'The Big New Movie'})
  .delete({ info: { actors: { _indexes: [0] }}})
  .if('size(info.actors) > 3')
  .run()
  .then((updatedMovie, metadata) => {
    console.log(updatedMovie);
  });
```
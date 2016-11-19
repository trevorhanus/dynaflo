(NOT SUPPORTED CURRENTLY)

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
    UpdateExpression: "set info.rating = info.rating + :val",
    ExpressionAttributeValues:{
        ":val":1
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
  .inc({
    info: {
      rating: 1
    }
  })
  .run()
  .then(updatedMovie => {
    console.log(updatedMovie);
  });
```

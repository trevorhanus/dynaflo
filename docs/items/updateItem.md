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

Dynanode

```javascript
import dn from 'dynanode';
const movies = new dn.Table('Movies');
movies.update({year: 2015, title: 'The Big New Movie'})
  .set({
    info: {
      rating: 5.5,
      plot: 'Everything happens all at once',
      actors: ['Larry', 'Moe', 'Curly']
    }
  })
  .run()
  .then((updatedMovie, metadata) => {
    console.log(updatedMovie);
  });
```
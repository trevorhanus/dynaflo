AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
```

Dynanode

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
  .then((oldMovie, metadata) => {
    // Inserted a new item
  });
```
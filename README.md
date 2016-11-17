# Dynanode

Dynanode is a wrapper around the AWS DynamoDB sdk for node. There are 
a lot of similar libraries out there, but they all seem to try to 
conform DynamoDB into a more familiar database, such as Mongo. This
api's goal is to make it easier to work with the AWS sdk and stay true to the 
DynamoDB way of doing things. So we will use the termonology set forth from the sdk. For every
method, we will show you how to do it with the sdk, and then how you do it
with dynanode.

Dynanode also returns Promises instead of using callbacks.

Here is a link to the related [AWS SDK Docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)

## Config

Dynanode is just a wrapper around the AWS SDK. So it uses the credentials you have store at ~/.aws/credentials
But you can override these credentials. 

#### AWS SDK

```javascript
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000" // Pointing to a locally running dynamodb instance
});
```

#### Dynanode

```javascript
// You could use the method above or, use dynanode's method below

dynanode.awsConfig({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000' 
})
```

## Tables

### Create a Table

#### AWS SDK

```javascript
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
```

#### Dynanode

```javascript
import dynanode from 'dynanode';

const cloudFormationTemplate = require('myCloudFormationTemplate.json');

dynanode.createTable(cloudFormationTemplate)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```

### Delete a Table

#### AWS SDK

```javascript
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
```

#### Dynanode

```javascript
import dynanode from 'dynanode';

dynanode.deleteTable('Movies')
  .then(data => {
    // table is deleted
  });
```

## Items

Now we will start to see the real benefits of dynanode.

### Insert an Item

#### AWS SDK

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

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.put({
    year: 2013,
    title: 'Turn It Down, Or Else!',
    info: {
      plot: 'Nothing happens at all.',
      rating: 0
    }
  })
  .then(data => {
    // Inserted a new item
  });
```

### Update an Item

#### AWS SDK

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

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
```

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.update({year: 2015, title: 'The Big New Movie'}, {
    _set: {
      info: {
        rating: 5.5,
        plot: 'Everything happens all at once',
        actors: ['Larry', 'Moe', 'Curly']
      }
    }
  })
  .then(updatedMovie => {
    console.log(updatedMovie);
  });
```

### Increment a Counter

#### AWS SDK

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

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.update({year: 2015, title: 'The Big New Movie'}, {
    _inc: {
      info: {
        rating: 1
      }
    }
  })
  .then(updatedMovie => {
    console.log(updatedMovie);
  });
```

### Conditionally Update an Item

#### AWS SDK

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

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.update({year: 2015, title: 'The Big New Movie'}, {
    _del: {
      info: {
        actors: ['0']
      }
    },
    _when: 'size(info.actors) > 3'
  })
  .then(updatedMovie => {
    console.log(updatedMovie);
  });
```

### Conditionally Delete an Item

#### AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Key:{
        "year":year,
        "title":title
    },
    ConditionExpression:"info.rating <= :val",
    ExpressionAttributeValues: {
        ":val": 5.0
    }
};

docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
```

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.delete({year: 2015, title: 'The Big New Movie'}, {
    _when: 'info.rating <= 5'
  })
  .then(data => {
    console.log(data);
  });
```

### Query - All movies released in a year

#### AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
```

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.query({
    _where: {
      year: 1985
    }
  })
  .then(data => {
    console.log(data);
  });
```

### Query - All movies released in a year with Certain Titles

#### AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");

var params = {
    TableName : "Movies",
    ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1992,
        ":letter1": "A",
        ":letter2": "L"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title
            + " ... " + item.info.genres
            + " ... " + item.info.actors[0]);
        });
    }
});
```

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.query({
    _where: {
      year: 1985,
      title: {
        _between: ['A', 'L']
      }
    },
    _project: {
      year: 1,
      title: 1,
      info: {
        genres: 1,
        actors: 1
      }
    }
  })
  .then(data => {
    console.log(data);
  });
```

### Scan a Table

#### AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
        "#yr": "year",
    },
    ExpressionAttributeValues: {
         ":start_yr": 1950,
         ":end_yr": 1959 
    }
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
           console.log(
                movie.year + ": ",
                movie.title, "- rating:", movie.info.rating);
        });

        // continue scanning if we have more movies
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
```

#### Dynanode

```javascript
const movies = new dynanode.Table('Movies');
movies.scan({
    _where: {
      year: {
        _between: [1950, 1959]
      }
    },
    _project: 'year, title, info.rating'
  })
  .then(onScan);

function onScan(movies, data) {
  movies.forEach(movie => {
      console.log(movie.year + ": ", movie.title, "- rating:", movie.info.rating);
    });
    if (!data.LastEvaluatedKey) {
      return movies.rescan()
        .then(onScan);
    }
}
```
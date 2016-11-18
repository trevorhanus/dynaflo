# Dynanode

Dynanode is a wrapper around the AWS DynamoDB SDK for node. There are 
similar libraries out there, but they all seem to attempt to make DynamoDB
do something it wasn't built to do. Dynanode's goal is to make it easier to 
work with the AWS SDK while staying true to the DynamoDB way of doing things. It uses
the termonology set forth by AWS. For every method, we will show you how to do it with 
the sdk, and then how you can do it with dynanode.

All Dynanode methods return Promises instead of using callbacks.

Here is a link to the related [AWS SDK Docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)

[AWS DynamoDB Docs](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)

[DynamoDB API](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html)

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
import dn from 'dynanode';

const cloudFormationTemplate = require('myCloudFormationTemplate.json');

dn.createTable(cloudFormationTemplate)
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
import dn from 'dynanode';

dn.deleteTable('Movies')
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

### Increment a Counter (Not Supported Currently)

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
const movies = new dn.Table('Movies');
movies.update({year: 2015, title: 'The Big New Movie'})
  .delete({ info: { actors: { _indexes: [0] }}})
  .if('size(info.actors) > 3')
  .run()
  .then((updatedMovie, metadata) => {
    console.log(updatedMovie);
  });
```

UpdateExpression is currently not supported.

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
const movies = dynanode.table('Movies');

movies.delete({year: 2015, title: 'The Big New Movie'})
    .if({
        info: { rating: 5 }
    })
    .run()
    .then((deleted, metadata) => {
      // do more stuff
    })
    .catch(err => {
      // item was not deleted
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
import * as dn from 'dynanode';
dn.table('Movies')
    .query()
    .where({year: 1985})
    .run()
    .then((movies, data) => {
        
    });
```

### Query - All movies released in a year with Certain Titles (Not Supported Currently)

#### AWS SDK

```javascript
var docClient = new AWS.DynamoDB.DocumentClient();

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
import * as dn from 'dynanode';
dn.table('Movies')
    .query()
    .where({year: 1985})
    .between('A', 'L', {key: 'title'})
    .run()
    .then((movies, data) => {
        
    });

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

### batchWrite

not currently supported. pull requests welcome

### batchGet

not currently supported. pull requests welcome

### createSet

not currently supported. pull requests welcome


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

### Set Defaults

```javascript
dynanode.defaults()
    .return('NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW')
    .select('ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES | SPECIFIC_ATTRIBUTES | COUNT')
    .consumedCapacity('INDEXES | TOTAL | NONE')
    .itemCollectionMetrics('SIZE | NONE')
    .consistentRead(boolean);
```
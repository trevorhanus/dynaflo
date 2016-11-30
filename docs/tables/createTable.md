AWS SDK

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

Fluent

```javascript
import Fluent from 'fluent-for-dynamodb';
const f = new Fluent(config);

const cloudFormationTemplate = require('myCloudFormationTemplate.json');

f.createTable(cloudFormationTemplate)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```
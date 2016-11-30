AWS SDK

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

Fluent

```javascript
import Fluent from 'fluent-for-dynamodb';
const f = new Fluent(config);

f.deleteTable('Movies')
  .then(data => {
    // table is deleted
  });
```

**Use**

```javascript
import Dynaflo from 'dynaflo';

const d = new Dynaflo({
  region: 'us-west-2',
  endpoint: 'dynamoDB_endpoint',
  accessKeyId: 'aws_access_key_id',
  secretAccessKey: 'aws_secret_access_key'
});

d.table('Movies') // DynamoDB table name
  .query() // method
  .whereKey({title: 'Fantastic Beasts'}) // key condition
  .pluck('title', {info:{rating: true}}) // only return these attributes
  .run() // run the query
  .then(data => {
    console.log(data.Items); // do stuff with data
  })
  .catch(err => {
    console.error(err); // catch errors
  });
```

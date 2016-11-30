**Use**

```javascript
import Fluent from 'fluent-for-dynamodb';

const f = new Fluent({
  region: 'us-west-2',
  endpoint: 'dynamoDB_endpoint',
  accessKeyId: 'aws_access_key_id',
  secretAccessKey: 'aws_secret_access_key'
});

f.table('Movies')
  .query()
  .where()
  .run()
  .then(data => {
    console.log(data.Items);
  })
  .catch(err => {
    console.error(err);
  });
```

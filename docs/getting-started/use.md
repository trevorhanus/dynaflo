**Use**

```javascript
import Fluent from 'fluent-for-dynamodb';

const f = new Fluent({
  region: 'us-west-2',
  endpoint: 'http://localhost:7777'
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

**Use**

```javascript
import Dynanode from 'dynanode';

const dn = new Dynanode({
  region: 'us-west-2',
  endpoint: 'http://localhost:7777'
});

dn.table('Movies')
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

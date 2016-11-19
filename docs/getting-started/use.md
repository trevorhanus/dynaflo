**Use**

```javascript
import dn from 'dynanode';

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
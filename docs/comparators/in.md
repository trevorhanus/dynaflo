Tests if an attribute equals the given value.

**Command Syntax**

```javascript
attr(attribute).in([value])
```

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({year: 2015})
  .where(attr('actor').in(['Harrison Ford', attr('star_actor')]))
  .run()
  .then(data => {
    // returns all movies with year = 2015 and title = to either 'Harrison Ford' or the value at star_actor
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
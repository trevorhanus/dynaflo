**Dynanode Command: .eq()**

**Command Syntax**

attr(attribute).eq(value)

**Description**

Tests if an attribute equals the given value.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({year: 2015})
  .where(attr('title').eq('Fantastic Beasts'))
  .run()
  .then(data => {
    // returns all movies with year = 2015 and title = 'Fantastic Beasts'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
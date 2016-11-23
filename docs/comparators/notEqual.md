**Dynanode Command: .ne()**

**Command Syntax**

attr(attribute).ne(value)

**Description**

Tests if an attribute does not equal the given value.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({year: 2015})
  .where(attr('title').ne('Fantastic Beasts'))
  .run()
  .then(data => {
    // returns all movies with year = 2015 and title not equal to 'Fantastic Beasts'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
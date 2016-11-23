**Dynanode Command: .ge()**

**Command Syntax**

attr(attribute).ge(value)

**Description**

Tests if an attribute is greater than or equal to the given value.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').ge(2015)))
  .run()
  .then(data => {
    // returns all action movies made in or after 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
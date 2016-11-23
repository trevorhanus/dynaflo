**Dynanode Command: .gt()**

**Command Syntax**

attr(attribute).gt(value)

**Description**

Tests if an attribute is greater than the given value.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').gt(2015)))
  .run()
  .then(data => {
    // returns all action movies made after 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
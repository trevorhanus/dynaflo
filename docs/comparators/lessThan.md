**Dynanode Command: .lt()**

**Command Syntax**

attr(attribute).lt(value)

**Description**

Tests if an attribute is less than the given value.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').lt(2015)))
  .run()
  .then(data => {
    // returns all action movies made before 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
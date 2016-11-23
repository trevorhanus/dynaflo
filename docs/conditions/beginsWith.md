**Dynanode Command: .beginsWith()**

**Command Syntax**

attr(attribute).beginsWith(substring)

**Description**

Tests if an attribute begins with a substring.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({year: 2015})
  .where(attr('title').beginsWith('Big')))
  .run()
  .then(data => {
    // returns movies with year = 2015 with title beginning with the substring 'Big'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
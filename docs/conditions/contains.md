**Dynanode Command: .contains()**

**Command Syntax**

attr(attribute).contains(operand)

operand must be a string  

**Description**

Tests if a string or an array contains a certain string.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({year: 2015})
  .where(attr('title').contains('Big')))
  .run()
  .then(data => {
    // returns movies with year = 2015 with title containing the substring 'Big'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
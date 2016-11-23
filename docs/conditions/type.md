**Dynanode Command: .type()**

**Command Syntax**

attr(attribute).type(type)

types: 'S' | 'SS' | 'N' | 'NS' | 'B' | 'BS' | 'BOOL' | 'NULL' | 'L' | 'M'  

**Description**

Tests if an attribute is of a certain type.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({year: 2015})
  .where(attr('actor').type('S')))
  .run()
  .then(data => {
    // returns movies with year = 2015 and actor attribute that is a string
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
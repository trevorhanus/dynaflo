Tests if an attribute is between two values.

**Command Syntax**

```javascript
attr(attribute).between(lowOperand, highOperand)
```

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').between(2005, 2015)))
  .run()
  .then(data => {
    // returns movies with genre = 'action' and made between 2005 and 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
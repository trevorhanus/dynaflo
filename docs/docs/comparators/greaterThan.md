Tests if an attribute is greater than the given value.

**Command Syntax**

```javascript
attr(attribute).gt(value)
```

**Usage**

```javascript
import Dynaflo from 'dynaflo';
const d = new Dynaflo(config);

d.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').gt(2015)))
  .run()
  .then(data => {
    // returns all action movies made after 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
Tests if an attribute is less than or equal to the given value.

**Command Syntax**

```javascript
attr(attribute).le(value)
```

**Usage**

```javascript
import Fluent from 'fluent-for-dynamodb';
const f = new Fluent(config);

f.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').le(2015)))
  .run()
  .then(data => {
    // returns all action movies made in or before 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
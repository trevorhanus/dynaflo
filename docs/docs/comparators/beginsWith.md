Tests if an attribute begins with a substring.

**Command Syntax**

```javascript
attr(attribute).beginsWith(substring)
```

**Usage**

```javascript
import Dynaflo from 'dynaflo';
const d = new Dynaflo(config);

d.table('Movies')
  .query({year: 2015})
  .where(attr('title').beginsWith('Big')))
  .run()
  .then(data => {
    // returns movies with year = 2015 with title beginning with the substring 'Big'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
Tests if an attribute does not equal the given value.

**Command Syntax**

```javascript
attr(attribute).ne(value)
```

**Usage**

```javascript
import Dynaflo from 'dynaflo';
const d = new Dynaflo(config);

f.table('Movies')
  .query({year: 2015})
  .where(attr('title').ne('Fantastic Beasts'))
  .run()
  .then(data => {
    // returns all movies with year = 2015 and title not equal to 'Fantastic Beasts'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
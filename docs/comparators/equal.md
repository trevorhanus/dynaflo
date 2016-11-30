Tests if an attribute equals the given value.

**Command Syntax**

```javascript
attr(attribute).eq(value)
```

**Usage**

```javascript
const f = new Fluent(config);

f.table('Movies')
  .query({year: 2015})
  .where(attr('title').eq('Fantastic Beasts'))
  .run()
  .then(data => {
    // returns all movies with year = 2015 and title = 'Fantastic Beasts'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
Tests if an attribute is greater than or equal to the given value.

**Command Syntax**

```javascript
attr(attribute).ge(value)
```

**Usage**

```javascript
const d = new Dynaflo(config);

f.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').ge(2015)))
  .run()
  .then(data => {
    // returns all action movies made in or after 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
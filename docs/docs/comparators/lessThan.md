Tests if an attribute is less than the given value.

**Command Syntax**

```javascript
attr(attribute).lt(value)
```

**Usage**

```javascript
const d = new Dynaflo(config);

f.table('Movies')
  .query({genre: 'action'})
  .where(attr('year').lt(2015)))
  .run()
  .then(data => {
    // returns all action movies made before 2015
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
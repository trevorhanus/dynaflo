Tests if a string or an array contains a certain string.

**Command Syntax**

```javascript
attr(attribute).contains(operand)
```

*Note: operand must be a string*

**Usage**

```javascript
const f = new Fluent(config);

f.table('Movies')
  .query({year: 2015})
  .where(attr('title').contains('Big')))
  .run()
  .then(data => {
    // returns movies with year = 2015 with title containing the substring 'Big'
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
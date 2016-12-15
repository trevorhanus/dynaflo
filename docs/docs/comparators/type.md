Tests if an attribute is of a certain type.

**Command Syntax**

```javascript
attr(attribute).type(type)

// types: 'S' | 'SS' | 'N' | 'NS' | 'B' | 'BS' | 'BOOL' | 'NULL' | 'L' | 'M'
```  

**Usage**

```javascript
const d = new Dynaflo(config);

d.table('Movies')
  .query({year: 2015})
  .where(attr('actor').type('S')))
  .run()
  .then(data => {
    // returns movies with year = 2015 and actor attribute that is a string
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
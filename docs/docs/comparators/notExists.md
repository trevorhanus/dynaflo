Tests if an attribute does not exist in a document.

**Command Syntax**

```javascript
attr(attribute).notExists()
```

**Usage**

```javascript
const f = new Fluent(config);

f.table('Movies')
  .update({year: 2015})
  .set({title: 'New Title'})
  .when(attr('title').notExists())
  .run()
  .then(data => {
    // only updates the title when the document does not have a title attribute
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
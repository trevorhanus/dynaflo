**Dynanode Command: .notExists()**

**Command Syntax**

attr(attribute).notExists()

**Description**

Tests if an attribute does not exist in a document.

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
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
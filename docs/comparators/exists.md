Tests if an attribute exists in a document.

**Command Syntax**

```javascript
attr(attribute).exists()
```

**Usage**

```javascript
import dn, {attr} from 'dynanode';

dn.table('Movies')
  .update({year: 2015})
  .set({title: 'New Title'})
  .when(attr('title').exists())
  .run()
  .then(data => {
    // only updates the title when the document has a title attribute
  });
```

**AWS Doc Links**

[Condition Expressions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)
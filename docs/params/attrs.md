Determines what attributes will be returned.

```
.attrs(attributes: string)
```

attributes is a comma separated list of key names

**Example**

```javascript
dn.table('Movies')
  .get({id: '1234'})
  .attrs('title, rating') // only the title and rating keys will be returned
  .run();
```

**AWS Documentation Link**

[Projection Expression](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.AccessingItemAttributes.html)

[Relevant AWS Documnetation](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ExpressionPlaceholders.html)

example dynamoDb doc

```javascript
{
  My.Scalar.Key: 10,
  MyMap: {
    MyKey: 'derp',
    MyKey2: 'climb'
  },
  MyArray: ['item1', 'item2']
}
```

**Top Level Attributes**

```javascript
.pluck('My.Scalar.Key', 'MyMap', 'MyArrray');
// should return 10, {MyKey: 'derp'}, and ['item1', 'item2']
```

**Nested Attributes**

```javascript
.pluck('My.Scalar,Key', {'MyMap': {'MyKey': true, 'MyKey2': true}}, 'MyArray[1]');
```

**Shorthand for Nested Attributes**

```javascript
.pluck('My.Scalar,Key', {'MyMap': ['MyKey', 'MyKey2']}, 'MyArray[1]');
// same as above
```

*AWS DocumentClient*

```javascript
const params = {
  ProjectionExpression: '#msk, #mm.#mk, #ma',
  ExpressionAttributeNames: {
    '#msk': 'My.Scalar.Key',
    '#mm': 'MyMap',
    '#mk': 'MyKey',
    '#ma': 'MyArray
  }
}
```

*AWS DocumentClient*

```javascript
const params = {
  ProjectionExpression: '#msk, #mm, #ma',
  ExpressionAttributeNames: {
    '#msk': 'My.Scalar.Key',
    '#mm': 'MyMap',
    '#ma': 'MyArray
  }
}
```
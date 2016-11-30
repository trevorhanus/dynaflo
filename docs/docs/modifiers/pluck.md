To read data from a table, you use operations such as .get(), .query() and .scan(). By default, DynamoDB returns all of the item attributes. 
To get just some of the attributes, rather than all of them, use .pluck(). Under the hood, .pluck() is setting the [projection expression param](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.AccessingItemAttributes.html).

**Example**

say you have a DynamoDB doc like this...

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

Just get top level attributes. this will return everything under the keys

```javascript
.pluck('My.Scalar.Key', 'MyArray');
```

**Nested Attributes**

Maybe we want to get nested objects

```javascript
.pluck('My.Scalar,Key', {'MyMap': {'MyKey': true, 'MyKey2': true}}, 'MyArray');
```

**Shorthand for Nested Attributes**

This can get pretty verbose, so we can use the shorthand

```javascript
.pluck('My.Scalar.Key', {'MyMap': ['MyKey', 'MyKey2']}, 'MyArray');
// same as above
```

Under the hood, this gets translated into the following params that are passed to the AWS DocumentClient 

*AWS DocumentClient*

```javascript
const params = {
  ProjectionExpression: '#msk, #mm.#mk, #ma',
  ExpressionAttributeNames: {
    '#msk': 'My.Scalar.Key',
    '#mm': 'MyMap',
    '#mk': 'MyKey',
    '#ma': 'MyArray'
  }
}
```

**AWS Documentation Link**

[Projection Expression](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.AccessingItemAttributes.html) <br>
[Expression Attribute Names]()

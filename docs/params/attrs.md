To read data from a table, you use operations such as .get(), .query() or .scan(). DynamoDB returns all of the item attributes by default. 
To get just some of the attributes, rather than all of them, use .attrs() which sets the projection expression

```
.attrs(attributes: string)
```

attributes is a comma separated list of key names

**Example**

say you have a dynamoDb doc like this...

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
.pluck('My.Scalar,Key', {'MyMap': {'MyKey': true, 'MyKey2': true}}, 'MyArray[1]');
```

**Shorthand for Nested Attributes**

This can get pretty verbose, so we can use the shorthand

```javascript
.pluck('My.Scalar.Key', {'MyMap': ['MyKey', 'MyKey2']}, 'MyArray[1]');
// same as above
```

Under the hood, this gets tranlated into the following params for the AWS DocumentClient 

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

**AWS Documentation Link**

[Projection Expression](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.AccessingItemAttributes.html)

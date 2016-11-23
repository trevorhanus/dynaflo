To write data to a table, you use operations such as .put(), .update() and .delete(). Sometimes, you may only want to write the data if certain conditions are met. 
To do this, use the .where() modifier. Under the hood, .where() is setting the [Condition Expression Param](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html#ConditionExpressionReference).

**Example**

Say you are representing a movie in dynamoDb like this...

```javascript
{
  id: '12345',
  title: 'Fantastic Beast and Where to Find Them',
  info: {
    rating: 5,
    should: 'climb'
  },
  shouldRecommend: false,
  stars: ['Red headed dude', 'Johnny Depp']
}
```

and you only want to update the `shouldRecommend` attribute if the rating = 5

```javascript
dn.table('Movies')
  .update({
    id: '12345'
  })
  .set({
    shouldRecommend: true
  })
  .where({
    info: {rating: 5}
  })
  .run();
```

You could also pass a string with the conditional logic

```javascript
dn.table('Movies')
  .update({id: '12345'})
  .set({
    shouldRecommend: true
  })
  .where('info.rating = 5')
  .run();
```

DynamoDb supports many logical operators and some functions. See the following documentation for more info.

[Condition Expression Operators and Functions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html)

This gets translated into the following params that are passed to the AWS DocumentClient.

*AWS DocumentClient*

```javascript
const params = {
  ConditionExpression: '#r = :rating',
  ExpressionAttributeNames: {
    '#r': 'info.rating',
  },
  ExpressionAttributeValues: {
    ':rating': 5
  }
}
```

**AWS Documentation Links**

[Condition Expression](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html#ConditionExpressionReference) <br>
[Expression Attribute Names]()

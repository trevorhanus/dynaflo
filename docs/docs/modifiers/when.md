To write data to a table, you use operations such as .put(), .update() and .delete(). Sometimes, you may only want to write the data when certain conditions are met. 
To do this, use the .when() modifier. Under the hood, .when() is setting the [Condition Expression Param](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html#ConditionExpressionReference).

**Example**

Say you are representing a movie in DynamoDB like this...

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

and you only want to update the `shouldRecommend` attribute when the rating = 5

```javascript
d.table('Movies')
  .update({id: '12345'})
  .set({
    shouldRecommend: true
  })
  .when({
    info: {rating: 5}
  })
  .run();
```

For more complicated conditions, you can use condition statements

```javascript
const positiveRating = attr({info:{rating:true}}).gt(5);
const harryOrFanMovie = attr('title').startsWith('Harry').or(
    attr('title').startsWith('Fan');
  );

d.table('Movies')
  .update({id: '12345'})
  .set({
    shouldRecommend: true
  })
  .when(positiveRating.and(harryOrFanMovie))
  .run();
```

This sets the shouldRecommend attribute when the rating is greater than 5 and the title starts with either 'Fan' or 'Harry'

See the [Comparators](/comparators/equal.md) section for a complete list

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

[Condition Expression Operators and Functions](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html) <br>
[Condition Expression](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.SpecifyingConditions.html#ConditionExpressionReference) <br>
[Expression Attribute Names]()

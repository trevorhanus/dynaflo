Conditions can be applied to some methods to filter the results that are returned. 

**Example**

```javascript
table.query()
  .where(
    attr('title').eq('Big New Movie').and(
      attr('rating').eq(5).or(
        attr({info: ['actor']}).eq('Johnny Depp')
      )
    ).or(
      attr('title').ne('Do Not Watch This Movie')
    )
  )
  .run();
```

```javascript
import Fluent from 'fluent-for-dynamodb';
const f = new Fluent(config);

f.table('Movies')
  .update({id: '12345'})
  .set({
    shouldRecommend: true
  })
  .run();

  .where(
    attr('title').lt(18).and(
      attr('another').type('S')
    ).or(
      attr('rating').gt(20)
    )
  )

  attr(topLevelPathOrNestedPath).comparator(operand).and(Condition).or(Condition)
  attr('title').type('S').and(
    attr('title').contains('Beasts')
  ).or(
    attr('title').eq('Fantastic Beasts')
  )
```

```javascript
condition-expression ::=
      operand comparator operand
    | operand BETWEEN operand AND operand
    | operand IN ( operand (',' operand (, ...) ))
    | function 
    | condition AND condition 
    | condition OR condition
    | NOT condition 
    | ( condition )

comparator ::=
    =     attr().eq(number | string | boolean | attr())
    | <>  attr().ne(number | string | boolean | attr())
    | <   attr().lt(number | attr())
    | <=  
    | > 
    | >=

function ::=
    attribute_exists (path) 
    | attribute_not_exists (path) 
    | attribute_type (path, type) 
    | begins_with (path, substr) 
    | contains (path, operand)
    | size (path)

    // less than
```
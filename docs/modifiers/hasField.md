Test if a document has a certain field.

**Example**

```javascript
sequence.hasFields('My.Scalar.Key');
```

```javascript
dn.table('Movies')
  .update({id: '12345'})
  .set({
    shouldRecommend: true
  })
  .run();

  .where(
    attr('title').lt(18).and(
      attr('another').type('S')
    ).or(
      
    )
    attr('rating').gt(20).or()
    attr({info:['rating']}).eq('').and()
    attr()
  )
```



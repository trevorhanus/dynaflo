Puts and/or deletes multiple items in a table.

**Command Syntax**

```
d.table('TableName')
  .batchPut(items: Object[])
  .batchDelete(keys: Object[])
```

**Usage**

```javascript
import Dynaflo from 'dynaflo';
const d = new Dynaflo(config);

const movies = new d.Table('Movies');
movies
  .batchPut([
    {
      year: 2013,
      title: 'Turn It Down, Or Else!',
      info: {
        plot: 'Nothing happens at all.',
        rating: 9
      }
    },
    {
      year: 2016,
      title: 'Passengers',
      info: {
        plot: 'Two passengers are awakened 90 years early on an unmanned spacecraft.',
        rating: 7.0
      }
    }
  ])
  .run()
  .then(data => {
    // Inserted two new items
  });
```

Or we could delete multiple items.

```javascript
d.table('Movies')
  .batchDelete([
    { year: '2013', title: 'Turn It Down, Or Else!'},
    { year: '2013', title: 'Turn It Down, Or Else!'}
  ])
  .run()
  .then(data => {
    // deleted the two items
  });
```

Or we could put and delete items in the same request

```javascript
d.table('Movies')
  .batchDelete([
    { year: '2013', title: 'Turn It Down, Or Else!'},
    { year: '2013', title: 'Turn It Down, Or Else!'}
  ])
  .batchPut(items)
  .run()
  .then(data => {

  });
```

**Available Modifiers**

none

**AWS Documentation Links**

[DocumentClient.batchWrite()](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchWrite-property) <br>
[DynamoDB API BatchWriteItem](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html)
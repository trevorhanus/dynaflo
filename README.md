# Dynaflo

Dynaflo is a wrapper around the AWS DynamoDB SDK for node. Dynaflo's goal is to make it easier to 
work with the AWS SDK while staying true to the DynamoDB way of doing things. Wherever possible, it uses
the termonology set forth in the AWS SDK.

## Quick Start

```bash
$ npm install --save dynaflo
```

```javascript
import Dynaflo from 'dynaflo';
const d = new Dynaflo(config);

d.table('Movies')
  .get({title: 'Fantastic Beasts'})
  .run()
  .then(movie => {
    console.log(movie.title); // Fantastic Beasts
  })
  .catch(err => {
    console.error(err);
  });
```

## Deeper Dive

Read through the full documentation here.

## Contributing

### Running DynamoDB locally

Make sure you have docker installed and run the docker image...

```
$ docker run -p 7777:7777 trevorhanus/dynamodb-local
```

### Testing

clone repo

```
$ git clone <clone url>
```

install dependencies

```
$ npm install
```

run tests

```
$ npm test
```

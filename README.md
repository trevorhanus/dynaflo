# Dynanode

Dynanode is a wrapper around the AWS DynamoDB SDK for node. Dynanode's goal is to make it easier to 
work with the AWS SDK while staying true to the DynamoDB way of doing things. Wherever possible, it uses
the termonology set forth in the AWS SDK.

## Quick Start

```bash
$ npm install --save dynanode
```

```javascript
import dn from 'dynanode';

dn.table('Movies')
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

First you will want to follow [this](http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.JsShell.html#GettingStarted.JsShell.Prereqs.Download)
guide by AWS to install a local instance of DynamoDb. You will want it for 
development. It also provides an interactive shell that is great for learning Dynamo.

### Testing

clone repo

```
$ git clone <clone url>
```

install dependancies

```
$ npm install
```

run tests

```
$ npm test
```

### Configuration

A config.json file is required in the root of the directory. The shape should be as follows.

```json
{
    "test": {
        "DYNAMODB_URL": "<url for running dynamoDb instance. the default is http://localhost:8000>",
        "AWS_ACCESS_KEY_ID": "not_needed_for_dynamo_running_locally",
        "AWS_SECRET_ACCESS_KEY": "not_needed_for_dynamo_running_locally"
    }
}
```

import * as AWS from 'aws-sdk';
import dynamoDb from '../src/dynamoDb';

describe('DynamoDb', () => {
  it('Reutrns an instance of AWS.DynamoDb', () => {
    expect(dynamoDb).toBeInstanceOf(AWS.DynamoDB);
  });

  it('Is connected to local DynamoDb running instance', () => {
    const config = require('../config.json');
    expect(dynamoDb.config.endpoint).toBe(config['test'].DYNAMODB_URL);
  });
});

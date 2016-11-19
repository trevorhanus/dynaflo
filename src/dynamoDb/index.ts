import * as AWS from 'aws-sdk';

const {NODE_ENV} = process.env;
const config = require('../../config.json');
if (!config || Object.keys(config).length < 1) {
  throw new Error('Could not find config.json in root directory. See README for details.');
}

AWS.config.update({
  region: 'us-west-2',
  endpoint: config[NODE_ENV].DYNAMODB_URL
});

export default new AWS.DynamoDB();

export const docClient = new AWS.DynamoDB.DocumentClient();

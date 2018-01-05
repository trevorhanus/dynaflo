import * as dotenv from 'dotenv';
import Dynaflo from '../src/';

dotenv.load();

const config = {
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  accessKeyId: 'test',
  secretAccessKey: 'test'
};

const d: Dynaflo = new Dynaflo(config);

export default d;

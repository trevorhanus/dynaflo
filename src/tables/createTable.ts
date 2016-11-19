import dynamoDb from '../dynamoDb';

export default function(cloudFormation: Object) {
  let cft = cloudFormation;
  if (cloudFormation.hasOwnProperty('Properties')) {
    cft = cloudFormation.Properties;
  }
  return new Promise((resolve, reject) => {
    dynamoDb.createTable(cft, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.TableDescription);
      }
    });
  });
}

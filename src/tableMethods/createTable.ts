import {dynamoDB} from '../Dynaflo';

export function createTable(cloudFormation: any) {
  let cft = cloudFormation;
  if (cloudFormation.hasOwnProperty('Properties')) {
    cft = cloudFormation.Properties;
  }
  return new Promise((resolve, reject) => {
    dynamoDB.createTable(cft, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.TableDescription);
      }
    });
  });
}

import {dynamoDB} from '../fluent';

export default function(tableName: string) {
  const params = {
    TableName: tableName
  };

  return new Promise((resolve, reject) => {
    dynamoDB.describeTable(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Table);
      }
    });
  });
}

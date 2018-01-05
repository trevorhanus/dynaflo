import {dynamoDB} from '../Dynaflo';

export function describeTable(tableName: string) {
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

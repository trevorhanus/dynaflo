import {dynamoDB} from '../Dynaflo';

export function deleteTable(tableName: string) {
  const params = {
    TableName: tableName
  };

  return new Promise((resolve, reject) => {
    dynamoDB.deleteTable(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.TableDescription);
      }
    });
  });
}

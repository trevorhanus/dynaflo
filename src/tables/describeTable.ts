import dynamoDb from '../dynamoDb';

export default function(tableName: string) {
  const params = {
    TableName: tableName
  };

  return new Promise((resolve, reject) => {
    dynamoDb.describeTable(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Table);
      }
    });
  });
}

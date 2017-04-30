import {ProxyHandler} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteId: ProxyHandler = (event, context, callback) => {
    const {pathParameters, body} = event;
    const {id} = pathParameters;
    const ddbTable = process.env.DDB_TABLE;

    const params = {
        TableName: ddbTable,
        Key      : {id}
    };
    dynamoDb.delete(params, (err, item) => {
        if (err) {
            console.error('fail to delete:\n', err, params);
            return callback(null, {statusCode: 500, body: JSON.stringify(err)});
        }

        callback(null, {
            statusCode: 200,
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: null
        });
    });
};

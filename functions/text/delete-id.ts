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
    dynamoDb.delete(params, (error, item) => {
        if (error) {
            console.error(error);
            return callback(null, {statusCode: 500, body: JSON.stringify(error)});
        }

        callback(null, {statusCode: 200, body: null});
    });
};

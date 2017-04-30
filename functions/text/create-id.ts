import {ProxyHandler} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const createId: ProxyHandler = (event, context, callback) => {
    const {pathParameters, body} = event;
    const {id} = pathParameters;
    const {text} = JSON.parse(body);
    const timestamp = Date.now();
    const ddbTable = process.env.DDB_TABLE;

    const params = {
        TableName: ddbTable,
        Item     : {
            id, text,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };
    dynamoDb.put(params, (error) => {
        if (error) {
            console.error(error);
            return callback(null, {statusCode: 500, body: `Couldn\'t create the todo item.`});
        }

        callback(null, {
            statusCode: 200,
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: JSON.stringify(params.Item)
        });
    });
};

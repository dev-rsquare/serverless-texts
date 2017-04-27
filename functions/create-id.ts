import {ProxyHandler} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';

declare const process: any;

const dynamoDb = new DynamoDB.DocumentClient();

export const createId: ProxyHandler = (event, context, callback) => {
    const {pathParameters, body} = event;
    const {id} = pathParameters;
    const {text} = JSON.parse(body);
    const timestamp = Date.now();
    const tableName = process.env.DYNAMODB_TABLE;
    console.log(tableName, Object.keys(process.env));
    if (!tableName) {
        return callback(null, {
            statusCode: 500,
            body: JSON.stringify(process.env)
        });
    }
    const params = {
        TableName: tableName,
        Item: {
            id, text,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };
    dynamoDb.put(params, (error) => {
        if (error) {
            console.error(error);
            return callback(null, {
                statusCode: 500,
                body: `Couldn\'t create the todo item.`
            });
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
};

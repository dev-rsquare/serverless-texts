import {ProxyHandler} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import ExpressionAttributeNameMap = DocumentClient.ExpressionAttributeNameMap;

const dynamoDb = new DynamoDB.DocumentClient();

export const updateId: ProxyHandler = (event, context, callback) => {
    const {pathParameters, body} = event;
    const {id} = pathParameters;
    const {text} = JSON.parse(body);
    const timestamp = Date.now();
    const ddbTable = process.env.DDB_TABLE;
    const params = {
        TableName: ddbTable,
        Key: {id},
        UpdateExpression: 'set #t=:t, updatedAt=:u',
        ExpressionAttributeNames: {
            '#t': 'text'
        },
        ExpressionAttributeValues:{
            ':t': text,
            ':u': timestamp
        },
        ReturnValues:'UPDATED_NEW'
    };
    dynamoDb.update(params, (error, item) => {
        const headers = {'Access-Control-Allow-Origin' : '*'};
        if (error) {
            console.error(error);
            return callback(null, {
                headers,
                statusCode: 500,
                body: `Couldn\'t update the item.`
            });
        }

        callback(null, {
            headers,
            statusCode: 200,
            body: JSON.stringify(item)
        });
    });
};

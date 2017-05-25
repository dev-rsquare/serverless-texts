import {ProxyHandler} from 'aws-lambda';
import {createErrorHandler, createOkHandler, dynamoDb} from '../common/index';
import {createLog} from '../log/index';

export const updateId: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);
    const {pathParameters, body} = event;
    const {id} = pathParameters;
    const {text} = JSON.parse(body);
    const timestamp = Date.now();
    const ddbTable = process.env.DDB_TABLE;

    dynamoDb.get({TableName: ddbTable, Key: {id}}, (err, oldItem) => {
        if (err) {
            return errorHandler(err, 404);
        }
        const updateParam = {
            TableName: ddbTable,
            Key: {id},
            UpdateExpression: `set #t=:t, updatedAt=:u, revision=:r`,
            ExpressionAttributeNames: {
                '#t': 'text'
            },
            ExpressionAttributeValues:{
                ':t': text,
                ':u': timestamp,
                ':r': (oldItem.Item.revision||0) + 1
            },
            ReturnValues:'UPDATED_NEW'
        };
        dynamoDb.update(updateParam, (err, item) => {
            if (err) {
                return errorHandler(JSON.stringify(err));
            }
            createLog(oldItem.Item);
            okHandler(JSON.stringify(item), 200);
        });
    })
};

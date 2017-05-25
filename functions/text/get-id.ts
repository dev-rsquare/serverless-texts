import {ProxyHandler} from 'aws-lambda';
import {createErrorHandler, createOkHandler, dynamoDb} from '../common/index';

export const getText: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);
    const {id} = event.pathParameters;
    const params = {
        TableName: process.env.DDB_TABLE,
        Key: {
            id
        }
    };

    dynamoDb.get(params, (err, data) => {
        if (err) {
            return errorHandler(JSON.stringify(err));
        }
        okHandler(JSON.stringify(data.Item));
    });
};

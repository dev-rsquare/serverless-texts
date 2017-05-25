import {ProxyHandler} from 'aws-lambda';
import {createErrorHandler, createOkHandler, dynamoDb} from '../common/index';

export const getLogs: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);
    const {id} = event.pathParameters;
    const params = {
        TableName: process.env.DDB_LOG_TABLE,
        Key: {
            id
        }
    };
    dynamoDb.scan(params, (err, output) => {
        if (err) {
            return errorHandler(JSON.stringify(err));
        }
        okHandler(JSON.stringify({items: output.Items, count: output.Count}));
    });
};

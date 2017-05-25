import {ProxyHandler} from 'aws-lambda';
import {createErrorHandler, createOkHandler, dynamoDb} from '../common/index';

export const getTexts: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);
    const params = {
        TableName: process.env.DDB_TABLE
    };

    dynamoDb.scan(params, (err, output) => {
        if (err) {
            return errorHandler(JSON.stringify(err));
        }
        okHandler(JSON.stringify({items: output.Items, count: output.Count}));
    });
};

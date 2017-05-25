import {ProxyHandler} from 'aws-lambda';
import {createErrorHandler, createOkHandler, dynamoDb} from '../common/index';

export const createId: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);
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
            updatedAt: timestamp,
            revision: 0
        }
    };
    dynamoDb.put(params, (err) => {
        if (err) {
            return errorHandler(JSON.stringify(err));
        }
        okHandler(JSON.stringify(params.Item));
    });
};

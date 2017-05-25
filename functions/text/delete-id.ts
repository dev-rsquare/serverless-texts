import {ProxyHandler} from 'aws-lambda';
import {createErrorHandler, createOkHandler, dynamoDb} from '../common/index';

export const deleteId: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);
    const {pathParameters, body} = event;
    const {id} = pathParameters;
    const ddbTable = process.env.DDB_TABLE;

    const params = {
        TableName: ddbTable,
        Key      : {
            id
        }
    };
    dynamoDb.delete(params, (err, item) => {
        if (err) {
            return errorHandler(JSON.stringify(err));
        }
        okHandler(null);
    });
};

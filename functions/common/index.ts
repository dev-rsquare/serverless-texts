import {APIGatewayEvent} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';

const headers = {
    'Access-Control-Allow-Methods' : '*',
    'Access-Control-Allow-Origin' : '*',
    "Access-Control-Allow-Credentials" : true
};

export const dynamoDb = new DynamoDB.DocumentClient();
export const isDev = (event: APIGatewayEvent) => event.requestContext.stage === 'dev';
export const createErrorHandler = callback => (body, statusCode = 500) => {
    console.error(`[${statusCode}] `, body);
    callback(null, {headers, statusCode, body});
};
export const createOkHandler = callback => (body, statusCode = 200) => {
    callback(null, {headers, statusCode, body});
};

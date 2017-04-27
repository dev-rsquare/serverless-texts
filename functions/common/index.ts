import {APIGatewayEvent} from 'aws-lambda';

export const isDev = (event: APIGatewayEvent) => event.requestContext.stage === 'dev';

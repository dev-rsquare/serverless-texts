import {ProxyHandler} from 'aws-lambda';
import {Lambda} from 'aws-sdk';
import {createErrorHandler, createOkHandler} from '../common/index';

const lambda = new Lambda();

export const createJson: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);

    lambda.invoke({
            FunctionName  : [process.env.FX_PREFIX, 'getTexts'].join('-'),
            InvocationType: 'RequestResponse'
        },
        (err, data) => {
            if (err) {
                return errorHandler(JSON.stringify(err));
            }
            const response = JSON.parse(data.Payload as string);
            const body = JSON.parse(response.body);
            const params = {
                FunctionName  : [process.env.FX_PREFIX, 'upload'].join('-'),
                InvocationType: 'RequestResponse',
                Payload       : JSON.stringify({
                    Key : 'texts.json',
                    Body: JSON.stringify(body.items)
                })
            };
            lambda.invoke(params, (err, data) => {
                if (err) {
                    return errorHandler(JSON.stringify(err));
                }
                const {statusCode, body} = JSON.parse(data.Payload as string);
                okHandler(body, statusCode);
            });
        });
};

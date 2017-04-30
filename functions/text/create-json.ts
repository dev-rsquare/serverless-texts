import {ProxyHandler} from 'aws-lambda';
import {Lambda} from 'aws-sdk';

const lambda = new Lambda();

export const createJson: ProxyHandler = (event, context, callback) => {
    lambda.invoke({
            FunctionName  : [process.env.FX_PREFIX, 'getTexts'].join('-'),
            InvocationType: 'RequestResponse'
        },
        (err, data) => {
            if (err) {
                console.error('fail to getTexts:\n', err);
                return callback(null, {statusCode: 500, body: JSON.stringify(err)});
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
                    console.error('fail to upload:\n', err, params);
                    return callback(null, {statusCode: 500, body: JSON.stringify(err)});
                }
                const {statusCode, body} = JSON.parse(data.Payload as string);

                return callback(null, {
                    statusCode, body,
                    headers: {'Access-Control-Allow-Origin' : '*'}
                });
            });
        });
};

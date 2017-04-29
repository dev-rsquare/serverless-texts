import {ProxyHandler} from 'aws-lambda';
import {Lambda} from 'aws-sdk';

const lambda = new Lambda();

export const createJson: ProxyHandler = (event, context, callback) => {
    lambda.invoke({
        FunctionName: [process.env.FX_PREFIX, 'getTexts'].join('-'),
        InvocationType: 'RequestResponse'
    },
    (err, data) => {
        if (err) {
            return callback(null, {statusCode: 500, body: JSON.stringify(err)});
        }
        const response = JSON.parse(data.Payload as string);
        const body = JSON.parse(response.body);

        return callback(null, {statusCode: 200, body: JSON.stringify(body.items)});
    });
};

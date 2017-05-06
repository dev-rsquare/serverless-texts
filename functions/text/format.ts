import {ProxyHandler} from 'aws-lambda';
import fetch from 'node-fetch';

const {S3_BUCKET, AWS_REGION} = process.env;

export const i18n: ProxyHandler = async (event, context, callback) => {
    try {
        const response = await fetch(`https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/texts.json`);
        const json: Texts = await response.json();
        const body = JSON.stringify(json.reduce((result, {id, text}) => {
            result[id] = text;
            return result;
        }, {}));
        return callback(null, {
            body,
            statusCode: 200,
            headers: {'Access-Control-Allow-Origin' : '*'}
        });
    } catch (ex) {
        console.error('fail to getTexts:\n', ex);
        return callback(null, {statusCode: 500, body: JSON.stringify(ex)});
    }
};

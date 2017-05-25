import {ProxyHandler} from 'aws-lambda';
import fetch from 'node-fetch';
import {createErrorHandler, createOkHandler} from '../common/index';

const {S3_BUCKET, AWS_REGION} = process.env;

export const i18n: ProxyHandler = async (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);

    try {
        const response = await fetch(`https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/texts.json`);
        const json: Texts = await response.json();
        const body = JSON.stringify(json.reduce((result, {id, text}) => {
            result[id] = text;
            return result;
        }, {}));

        return okHandler(body);
    } catch (ex) {
        errorHandler(JSON.stringify(ex));
    }
};

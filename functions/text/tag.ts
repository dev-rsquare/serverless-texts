import {ProxyHandler} from 'aws-lambda';
import fetch from 'node-fetch';

const JSON_URL = 'https://serverless-text.s3.ap-northeast-2.amazonaws.com/texts.json';

export const translator: ProxyHandler = async (event, context, callback) => {
    console.log('translator');

    try {
        const response = await fetch(JSON_URL);
        const json = await response.json();
        console.log(response.json());
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(json),
            headers: {'Access-Control-Allow-Origin' : '*'}
        });
    } catch (ex) {
        console.error('fail to getTexts:\n', ex);
        return callback(null, {statusCode: 500, body: JSON.stringify(ex)});
    }
};

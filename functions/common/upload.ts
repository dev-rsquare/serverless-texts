import {ProxyHandler} from 'aws-lambda';
import {S3} from 'aws-sdk';

const s3 = new S3();

export const upload: ProxyHandler = (event, context, callback) => {
    s3.upload({
            Bucket: process.env.S3_BUCKET,
            Key   : 'texts.json',
            Body  : JSON.stringify(event)
        },
        (err, data) => {
            if (err) {
                return callback(null, {statusCode: 500, body: JSON.stringify(err)});
            }
            return callback(null, {statusCode: 200, body: data.Location});
        });
};
import {ProxyHandler} from 'aws-lambda';
import {S3} from 'aws-sdk';

const s3 = new S3();

export const upload: ProxyHandler = (event, context, callback) => {
    const {Key, Body} = event as any;
    const params = {
        Bucket: process.env.S3_BUCKET,
        ACL   : 'public-read',
        Key, Body
    };
    s3.upload(params, (err, data) => {
        if (err) {
            console.error('fail to s3 upload:\n', err, params);
            return callback(null, {statusCode: 500, body: JSON.stringify(err)});
        }
        return callback(null, {statusCode: 200, body: data.Location});
    });
};
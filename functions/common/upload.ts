import {ProxyHandler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {createErrorHandler, createOkHandler} from './index';

const s3 = new S3();

export const upload: ProxyHandler = (event, context, callback) => {
    const errorHandler = createErrorHandler(callback);
    const okHandler = createOkHandler(callback);
    const {Key, Body} = event as any;
    const params = {
        Bucket: process.env.S3_BUCKET,
        ACL   : 'public-read',
        Key, Body
    };
    s3.upload(params, (err, data) => {
        if (err) {
            return errorHandler(JSON.stringify(err));
        }
        okHandler(data.Location);
    });
};
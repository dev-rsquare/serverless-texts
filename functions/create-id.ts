import {ProxyHandler} from 'aws-lambda';
import {isDev} from './common/index';

export const createId: ProxyHandler = (event, context, callback) => {
    const dev = isDev(event);
    const body: any = {
        text: {
            ko: [{
                id: 'test_id',
                text: '테스트 아이디'
            }]
        },
    };
    if (dev) {
        body.input = event;
    }
    const response = {
        statusCode: 200,
        body:       JSON.stringify(event.body),
    };

    callback(null, response);
};

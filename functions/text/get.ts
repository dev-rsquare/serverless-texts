import {ProxyHandler} from 'aws-lambda';
import {dynamoDb} from '../common/index';

export const getTexts: ProxyHandler = (event, context, callback) => {
    const params = {TableName: process.env.DDB_TABLE};

    dynamoDb.scan(params, (err, output) => {
        if (err) {
            console.error('fail to scan:\n', err, params);
            return callback(null, {statusCode: 500, body: `Couldn\'t create the todo item.`});
        }

        callback(null, {
            statusCode: 200,
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: JSON.stringify({items: output.Items, count: output.Count})
        });
    });
};

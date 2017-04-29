import {ProxyHandler} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const getJson: ProxyHandler = (event, context, callback) => {
    const params = {TableName: process.env.DDB_TABLE};

    dynamoDb.scan(params, (error, output) => {
        if (error) {
            console.error(error);
            return callback(null, {statusCode: 500, body: `Couldn\'t create the todo item.`});
        }

        callback(null, {statusCode: 200, body: JSON.stringify({items: output.Items, count: output.Count})});
    });
};

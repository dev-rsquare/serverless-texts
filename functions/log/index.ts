import {dynamoDb} from '../common/index';

export const createLog = item => {
    const ddbLogTable = process.env.DDB_LOG_TABLE;
    const createParam = {
        TableName: ddbLogTable,
        Item     : {
            revision: 0,
            ...item
        }
    };
    dynamoDb.put(createParam, err => err && console.error('fail to log \n', item));
};

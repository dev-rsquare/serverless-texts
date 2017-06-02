import {CustomAuthorizerHandler} from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

export const verify: CustomAuthorizerHandler = (event, context, callback) => {
    const token = event.authorizationToken;

    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, {algorithms: ['HS256']}, (err, payload) => {
        if (err) {
            console.error(`Unauthorized - invalid token : ${JSON.stringify(err)}`);
            return callback('Unauthorized' as any as Error);
        }
        return callback(null, generatePolicy('Allow', event.methodArn));
    });
};

const generatePolicy = (effect, resource) => {
    const principalId = 'user';
    const authResponse: any = {};

    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument: any = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne: any = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};

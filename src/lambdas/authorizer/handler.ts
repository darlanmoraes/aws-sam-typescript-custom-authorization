import { CustomAuthorizerHandler, CustomAuthorizerResult } from 'aws-lambda';

const { ENV } = process.env;

export const buildIAM = (principalId: string, effect: string, resource: string): CustomAuthorizerResult => {
  const policy: CustomAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    }
  };
  return policy;
};

const execute: CustomAuthorizerHandler = async (event, _context, callback) => {
  try {
    console.log(JSON.stringify(event));
    console.log(ENV);
    const { authorizationToken, methodArn } = event;
    if (authorizationToken && methodArn) {
      const index = methodArn.split(`/${ENV}/`)[0].lastIndexOf('/');
      const arn = `${methodArn.substring(0, index)}/*`;
      const effect = 'Allow';
      const policyId = new Date().toString();
      // Give the Lambda an opportunity to execute
      return buildIAM(policyId, effect, arn);
    }
  } catch (e) {
    console.error(e.message);
  }
  // HTTP: 401
  callback('Unauthorized');
};

module.exports.execute = execute;
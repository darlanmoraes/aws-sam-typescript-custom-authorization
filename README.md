# AWS SAM Typescript + Custom Authorizer
This application is built on top of AWS SAM and runs over HTTP with AWS API Gateway, saving data to AWS DynamoDB. API's are defined using Swagger templates + AWS. For each resource, a Stack will be created(one for DynamoDB, one for Api Gateway, one for all functions). It's using a Custom Authorizer that is applied through Swagger template. The code is all in Typescript and built with Grunt and you can create different environments through the 'ENV' environment property.

To run this you will need a pair with AWS Access Key + AWS Access Key Id.

## DEPLOY EVERYTHING
ENV=development \
LAMBDA=comments \
BUCKET=<your-custom-bucket> \
REGION=<your-region> \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:deploy

## DEPLOY JUST DYNAMODB
ENV=development \
LAMBDA=comments \
BUCKET=<your-custom-bucket> \
REGION=<your-region> \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:dynamodb:deploy

## DEPLOY JUST LAMBDAS
ENV=development \
BUCKET=<your-custom-bucket> \
REGION=<your-region> \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:lambdas:deploy

## DEPLOY JUST GATEWAY
ENV=development \
LAMBDA=comments \
BUCKET=<your-custom-bucket> \
REGION=<your-region> \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:gateway:deploy

## Create Comment
```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "{
  \"comment\": \"Comment: $(uuid)\"
}" \
'https://<generated-gateway-id>.execute-api.<your-region>.amazonaws.com/development/comments'
```

## List Comments
```
curl -X GET -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
'https://<generated-gateway-id>.execute-api.<your-region>.amazonaws.com/development/comments' | jq .
```

## Create Post
```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "{
  \"post\": \"Post: $(uuid)\"
}" \
'https://<generated-gateway-id>.execute-api.<your-region>.amazonaws.com/development/posts'
```

## List Posts
```
curl -X GET -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
'https://<generated-gateway-id>.execute-api.<your-region>.amazonaws.com/development/posts' | jq .
```
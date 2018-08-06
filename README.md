# DEPLOY EVERYTHING
ENV=development \
LAMBDA=comments \
BUCKET=sam-custom-authorization-bucket \
REGION=sa-east-1 \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:deploy

# DEPLOY JUST LAMBDAS
ENV=development \
LAMBDA=comments \
BUCKET=sam-custom-authorization-bucket \
REGION=sa-east-1 \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:lambdas:package:deploy

## Create Comment
```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "{
  \"comment\": \"Comment: $(uuid)\"
}" \
'https://<account_id>.execute-api.sa-east-1.amazonaws.com/development/comments'
```

## List Comments
```
curl -X GET -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
'https://<account_id>.execute-api.sa-east-1.amazonaws.com/development/comments' | jq .
```

## Create Post
```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "{
  \"post\": \"Post: $(uuid)\"
}" \
'https://<account_id>.execute-api.sa-east-1.amazonaws.com/development/posts'
```

## List Posts
```
curl -X GET -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
'https://<account_id>.execute-api.sa-east-1.amazonaws.com/development/posts' | jq .
```
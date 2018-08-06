# CREATE ZIP
ENV=development \
LAMBDA=comments \
BUCKET=sam-custom-authorization-bucket \
REGION=sa-east-1 \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:s3:package

# SEND ZIP TO S3
ENV=development \
LAMBDA=comments \
BUCKET=sam-custom-authorization-bucket \
REGION=sa-east-1 \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:s3:deploy

# CREATE TEMPLATE
ENV=development \
LAMBDA=comments \
BUCKET=sam-custom-authorization-bucket \
REGION=sa-east-1 \
ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
npm run aws:sa:deploy

# CREATE DYNAMODB
ENV=development \
BUCKET=sam-custom-authorization-bucket \
REGION=sa-east-1 \
npm run aws:dynamodb:deploy
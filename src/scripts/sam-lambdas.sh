#!/usr/bin/env bash
set -e

# ./sam-lambda.sh development sa-east-1 comments my-bucket AXYZ 7RABC+123

# Match Input With Names
I=("$1" "$2" "$3" "$4" "$5")
M=("STAGE" "REGION" "BUCKET" "ACCESS_KEY_ID" "SECRET_ACCESS_KEY")

# Check Input
for ((i = 1; i < 5 + 1; i++));
do
  if [ -z ${I[$i - 1]} ]
    then
      echo "Argument '${M[$i - 1]}' is required!"
      exit 1
  fi
done

# Template Source
SOURCE="./src/lambdas"
HASH="$(date +%s)"

# Send Packages to S3
for NAME in $(find $SOURCE/* -maxdepth 1 -type d -exec basename {} \;) ; do
  if [ ! -z $NAME ]
    then
      aws s3 cp ./.compress/lambda-$NAME.zip s3://$3/sam/$1/$HASH-lambda-$NAME.zip
  fi
done

# Package Cloudformation
echo "SAM packaging..."
sam package \
  --region $2 \
  --template-file ${SOURCE}/template.yaml \
  --output-template-file ${SOURCE}/$1-packaged-template.yaml \
  --s3-bucket $3 \
  --s3-prefix "sam"

# Update Cloudformation
echo "SAM deploying..."
sam deploy  \
  --region $2 \
  --template-file ${SOURCE}/$1-packaged-template.yaml \
  --stack-name $1-stack-lambdas \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    Stage=$1 \
    Bucket=$3 \
    Region=$2 \
    AccessKeyId=$4 \
    SecretAccessKey=$5 \
    Hash=$HASH || true

# Remove Unused File
rm -rf ${SOURCE}/$1-packaged-template.yaml
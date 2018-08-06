#!/usr/bin/env bash
set -e

# ./sam-lambda.sh development sa-east-1 my-bucket

# Match Input With Names
I=("$1" "$2" "$3")
M=("STAGE" "REGION" "BUCKET")

# Check Input
for ((i = 1; i < 3 + 1; i++));
do
  if [ -z ${I[$i - 1]} ]
    then
      echo "Argument '${M[$i - 1]}' is required!"
      exit 1
  fi
done

# Template Source
SOURCE="./src/resources/dynamodb"

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
sam deploy \
  --template-file ${SOURCE}/$1-packaged-template.yaml \
  --stack-name $1-stack-dynamodb \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    Stage=$1 || true

# Remove Unused File
rm -rf ${SOURCE}/$1-packaged-template.yaml
#!/usr/bin/env bash
set -e

# ./sam-lambda.sh development sa-east-1 comments my-bucket AXYZ 7RABC+123

# Match Input With Names
I=("$1" "$2" "$3" "$4" "$5" "$6")
M=("STAGE" "REGION" "LAMBDA" "BUCKET" "ACCESS_KEY_ID" "SECRET_ACCESS_KEY")

# Check Input
for ((i = 1; i < 6 + 1; i++));
do
  if [ -z ${I[$i - 1]} ]
    then
      echo "Argument '${M[$i - 1]}' is required!"
      exit 1
  fi
done

# Template Source
SOURCE="./src/lambdas"

# Package Cloudformation
echo "SAM packaging..."
sam package \
  --region $2 \
  --template-file ${SOURCE}/$3/template.yaml \
  --output-template-file ${SOURCE}/$3/$1-packaged-template.yaml \
  --s3-bucket $4 \
  --s3-prefix "sam"

# Update Cloudformation
echo "SAM deploying..."
sam deploy  \
  --region $2 \
  --template-file ${SOURCE}/$3/$1-packaged-template.yaml \
  --stack-name $1-stack-lambda-$3 \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    Stage=$1 \
    Bucket=$4 \
    Region=$2 \
    AccessKeyId=$5 \
    SecretAccessKey=$6 || true

# Remove Unused File
rm -rf ${SOURCE}/$3/$1-packaged-template.yaml
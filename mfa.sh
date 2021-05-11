#!/bin/bash

usage () {
  echo 'Usage : Script <AWS_PROFILE> <SERIAL_NUMBER> <TOKEN_CODE>'
  echo '       <AWS_PROFILE>   user-profile name, like user-serverless'
  echo '       <SERIAL_NUMBER> e.g. arn:aws:iam::1234:mfa/severless'
  echo '       <TOKEN_CODE>    mfa code from the authenticating device'
  exit
}

AWS_PROFILE=$1   # user-profile name, like user-serverless
SERIAL_NUMBER=$2 # e.g. arn:aws:iam::1234:mfa/severless
TOKEN_CODE=$3    # mfa code

if [ "$AWS_PROFILE" = "" ]
then
    usage
    exit 0
fi
if [ "$SERIAL_NUMBER" = "" ]
then
    usage
    exit 0
fi
if [ "$TOKEN_CODE" = "" ]
then
    usage
    exit 0
fi

MFA_PROFILE='mfa'

echo "🔑🔒 Enabling MFA Security for IAM Profile: $AWS_PROFILE"

# min --duration-seconds is 900 (15 mins)
AWS_RESPONSE=$(aws sts get-session-token --serial-number $SERIAL_NUMBER --token-code $TOKEN_CODE --profile $AWS_PROFILE --duration-seconds 3600 --output text)
if [ "$AWS_RESPONSE" = "" ]
then
  exit 1
fi

AWS_ACCESS_KEY_ID=$(echo $AWS_RESPONSE | awk {'print $2'})
AWS_SECRET_ACCESS_KEY=$(echo $AWS_RESPONSE | awk {'print $4'})
AWS_SESSION_TOKEN=$(echo $AWS_RESPONSE | awk {'print $5'})

aws configure --profile $MFA_PROFILE set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure --profile $MFA_PROFILE set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure --profile $MFA_PROFILE set aws_session_token $AWS_SESSION_TOKEN

echo "🔐 MFA Enabled for: $AWS_PROFILE"

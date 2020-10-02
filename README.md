# Elves

Santa's little helpers email campaign.

## Offline Dev

`serverless offline start`
`serverless invoke local --function <function-name> --path event.json --watch`

as described here [serverless blog](https://www.serverless.com/plugins/serverless-webpack)

with these plugins:
* [serverless-webpacK](https://github.com/serverless-heaven/serverless-webpacK)
* [serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
* [serverless-offline](https://github.com/dherault/serverless-offline)

## Secrets

handling secrets at runtime 

as described here [serverless-secrets](https://github.com/trek10inc/serverless-secrets)

## Created

`sls create -t aws-nodejs-typescript`

as described here [sls create](https://www.serverless.com/framework/docs/providers/aws/cli-reference/create/)

Requirements:

- node
- nvm
- npm i -g serverless

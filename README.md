# Elves

## Offline Dev

`serverless offline start`
`serverless invoke local --function <function-name> --path event.json --watch`

as described here []('https://www.serverless.com/plugins/serverless-webpack')

with these plugins:
* []('https://github.com/dherault/serverless-offline')
* []('https://github.com/99xt/serverless-dynamodb-local')
* []('https://github.com/serverless-heaven/serverless-webpacK')

## Created

`sls create -t aws-nodejs-typescript`

as described here ['sls create']('https://www.serverless.com/framework/docs/providers/aws/cli-reference/create/')

Requirements:

- node
- nvm
- npm i -g serverless

import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  configValidationMode: 'error',
  service: {
    name: 'santa-elves',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-dynamodb-local',
    'serverless-offline',
    // 'serverless-secrets'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: '${opt:region, "ap-southeast-2"}',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;

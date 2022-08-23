import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from "aws-cdk-lib/aws-apigateway"

import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
// ...
import {join} from "path"
import { CfnOutput } from 'aws-cdk-lib';
export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Construct new Api 
    const api = new apigateway.RestApi(this, `api-gateway-random-user`, {
      restApiName: `dummy-user-api`,
      description: "Generate dummy users infos",

    });

    // ...

    // Create new /users resource
    const usersResource =api.root.addResource('users');
    
    // Lambda nodejs function properties
    const nodeJsFunctionProps: lambdaNodejs.NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk'
        ],
        minify: true
      },
      depsLockFilePath: join(__dirname, './functions', 'package-lock.json'),
      environment: {
      },
      runtime: lambda.Runtime.NODEJS_14_X,
    }
    
    // Define a new Lambda function 
    const generateUserInfoFunc = new lambdaNodejs.NodejsFunction(this, `generate-user-info-Function`, {
      handler: "handle",
      entry: join(__dirname, './functions', 'handler.ts'),
      functionName: `generate-dummy-user-info`,
      description: "Generate dummy user info",
      ...nodeJsFunctionProps
    });
 
    // Create new integratio
    const generateUserInfoIntegration = new apigateway.LambdaIntegration(generateUserInfoFunc);
    usersResource.addMethod('GET', generateUserInfoIntegration, {}
    );

    new CfnOutput(this,"api gateway url",{value:api.url})
  }
}

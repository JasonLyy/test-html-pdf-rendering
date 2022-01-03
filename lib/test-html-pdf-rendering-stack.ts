import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as path from "path";
import { Lambda } from "aws-cdk-lib/aws-ses-actions";

export class TestHtmlPdfRenderingStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const puppeteerLayer = new lambda.LayerVersion(this, "puppeteer-layer", {
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
      code: lambda.Code.fromAsset(path.join(__dirname, "../layers/puppeteer")),
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const testPdfBucket = new s3.Bucket(this, "test-pdf-bucket", {
      bucketName: "jason-test-html-pdf-bucket-30122",
    });

    const puppeteerExportLambda = new nodejs.NodejsFunction(
      this,
      "puppeteer-export-lambda",
      {
        entry: path.join(
          __dirname,
          "../test-html-pdf-rendering-puppeteer/src/lambda/exportLambda.ts"
        ),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_14_X,
        layers: [puppeteerLayer],
        bundling: {
          externalModules: ["chrome-aws-lambda", "puppeteer-core"],
        },
        memorySize: 2048,
        timeout: Duration.seconds(30),
      }
    );
    const reactPdfExportLambda = new nodejs.NodejsFunction(
      this,
      "react-pdf-export-lambda",
      {
        entry: path.join(
          __dirname,
          "../test-html-pdf-rendering-react-pdf/src/lambda/exportLambda.ts"
        ),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_14_X,
        memorySize: 2048,
        timeout: Duration.seconds(30),
      }
    );

    testPdfBucket.grantPut(reactPdfExportLambda);
    testPdfBucket.grantPut(puppeteerExportLambda);
  }
}

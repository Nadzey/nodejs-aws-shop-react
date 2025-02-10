import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ✅ Создаем приватный S3 bucket (доступ только через CloudFront)
    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      bucketName: "myshop-app-bucket",
      publicReadAccess: false,  // ❌ Отключаем публичный доступ
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // ✅ Блокируем все публичные запросы
    });

    // ✅ Создаем Origin Access Identity (OAI) для CloudFront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "OAI");

    // ✅ Даем CloudFront доступ к S3
    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [`${websiteBucket.bucketArn}/*`],
        principals: [new iam.CanonicalUserPrincipal(originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
      })
    );

    // ✅ Создаем CloudFront Distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, "MyShopCloudFront", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket,
            originAccessIdentity: originAccessIdentity, // ✅ Доступ через OAI
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    // ✅ Автоматическая загрузка файлов в S3
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../dist")], // Загружаем файлы из dist/
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ["/*"], // Очистка кеша CloudFront после загрузки
    });

    // ✅ Выводим URL CloudFront
    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: distribution.distributionDomainName,
      description: "CloudFront URL",
    });
  }
}

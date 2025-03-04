import { S3 } from "@aws-sdk/client-s3";
import './envConfig.ts'
if (!process.env.AWS_S3_KEY || !process.env.AWS_S3_SECRET || !process.env.AWS_S3_ENDPOINT || !process.env.AWS_S3_REGION) {
    throw new Error("Missing AWS_S3_KEY, AWS_S3_SECRET or AWS_S3_ENDPOINT environment variables");
}

const s3Client = new S3({
    forcePathStyle: true,
    endpoint: process.env.AWS_S3_ENDPOINT,
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_KEY!,
      secretAccessKey: process.env.AWS_S3_SECRET!
    },
});

export { s3Client };

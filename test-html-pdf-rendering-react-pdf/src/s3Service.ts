import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";

export const saveToS3 = async (data: S3.Body) => {
  const s3 = new S3();
  return s3
    .upload({
      Bucket: "jason-test-html-pdf-bucket-30122",
      Key: `${uuid()}.pdf`,
      Body: data,
    })
    .promise();
};

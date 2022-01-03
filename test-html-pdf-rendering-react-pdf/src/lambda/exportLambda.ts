import { Handler } from "aws-cdk-lib/aws-lambda";
import { TestDocument } from "../testDocument";
import { renderToStream } from "@react-pdf/renderer";
import { saveToS3 } from "../s3Service";

// - Uses PDFKit underlying
// - Uses React components to 'render' which acts as 'wrapper' around PDFKit
// - Supports CSS!
// - More performant
export const handler: Handler = async (event, context) => {
  const document = TestDocument({ title: "Text 1", author: "Text 2" });
  if (!document) return;

  const fileStream = await renderToStream(document);
  const result = await saveToS3(fileStream);
  console.log(result);
};

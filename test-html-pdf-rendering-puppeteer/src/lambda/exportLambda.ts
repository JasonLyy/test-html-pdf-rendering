import { Handler } from "aws-lambda";
import { getTestRender } from "../renderService";
import { saveToS3 } from "../s3Service";

export const handler: Handler = async (event, context) => {
  const pdf = await getTestRender();
  console.log("PDF: ", pdf);
  const saveResult = await saveToS3(pdf);
  console.log("SAVE: ", saveResult);
};

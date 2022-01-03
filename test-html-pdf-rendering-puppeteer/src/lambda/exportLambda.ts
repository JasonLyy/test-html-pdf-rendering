import { Handler } from "aws-lambda";
import { getTestRender } from "../renderService";
import { saveToS3 } from "../s3Service";

// - Maximum flexibility as raw HTML
// - Could be harder to manage page breaks? Will have to investigate
// - Very heavy but usable
// - Will need to explore a solution to generate HTML file for this to render
export const handler: Handler = async (event, context) => {
  const pdf = await getTestRender();
  console.log("PDF: ", pdf);
  const saveResult = await saveToS3(pdf);
  console.log("SAVE: ", saveResult);
};

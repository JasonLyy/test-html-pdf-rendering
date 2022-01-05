import { Handler } from "aws-lambda";
import { getTestRender } from "../renderService";
import { saveToS3 } from "../s3Service";

export const handler: Handler = async (event, context) => {
  const render = await getTestRender();

  const result = await saveToS3(render);
  console.log(result);
};

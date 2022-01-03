import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
export const getTestRender = async () => {
  //   const browser = await chromium.puppeteer.launch({
  //     headless: true, // cannot run headless: false when rendering to pdf
  //   });

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/Pikachu");

  const pdf = await page.pdf({
    format: "a4",
  });

  await browser.close();
  return pdf;
};

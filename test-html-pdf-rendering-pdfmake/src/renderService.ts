import pdfmake from "pdfmake";
import * as stream from "stream";
import * as fs from "fs";
import font from "./fonts/Roboto-Medium.ttf";

export const getTestRender = async () => {
  const pdf = new pdfmake({
    Roboto: {
      normal: font,
      bold: font,
      italics: font,
      bolditalics: font,
    },
  });
  const document = pdf.createPdfKitDocument({
    pageSize: "A4",
    pageMargins: [0, 20, 8, 30],
    defaultStyle: {
      fontSize: 10,
    },
    footer: (currentPage, pageCount) => {
      return {
        text: `Page ${currentPage}/${pageCount}`,
        alignment: "right",
        margin: [0, 8, 8, 0],
        fontSize: 6,
      };
    },
    content: [
      { text: "Tables", style: "header" },
      "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
      {
        text: "A simple table (no headers, no width specified, no spans, no styling)",
        style: "subheader",
      },
      "The following table has nothing more than a body array",
      {
        style: "tableExample",
        table: {
          body: [
            ["Column 1", "Column 2", "Column 3"],
            ["One value goes here", "Another one here", "OK?"],
          ],
        },
      },
    ],
  });

  const passthrough = new stream.PassThrough();
  document.pipe(passthrough);
  document.end();

  return passthrough;
};

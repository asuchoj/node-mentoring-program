import * as fs from 'fs';
import {pipeline} from 'stream';
import csvToJsonV2 from 'csvtojson';

const csvFilePath ='./task1/csv/example.csv';
const jsonFilePath ='./task1/texts/text.txt';
const csvLowercaseColumnHeaders = ['book','author', 'amount', 'price'];
const csvIgnoreColumnsColumnsReg = /(amount)/;

function writeConvertibleFileFromCsvToJSON(pathCsvFile, pathJsonFile, csvLowercaseColumnHeaders, csvIgnoreColumnsColumnsReg) {
  pipeline(
      fs.createReadStream(pathCsvFile),
      csvToJsonV2({
        noheader: false,
        headers: csvLowercaseColumnHeaders,
        ignoreColumns: csvIgnoreColumnsColumnsReg,
      }),
      fs.createWriteStream(pathJsonFile),
      (err) => {
        if (err) {
          logger(err);
        }

        logger('done');
      },
  );
}

writeConvertibleFileFromCsvToJSON(csvFilePath, jsonFilePath, csvLowercaseColumnHeaders, csvIgnoreColumnsColumnsReg);

function logger(message) {
  console.log(message);
}

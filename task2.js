const fs = require('fs');  
const {pipeline} = require('stream');
const csvToJsonV2 = require("csvtojson");

const csvFilePath ='./csvdirectory/example.csv';
const jsonFilePath ='./jsondirectory/test';
const csvLowercaseColumnHeaders = ['book','author', 'amount', 'price'];
const csvIgnoreColumnsColumnsReg = /(amount)/;

async function writeConvertibleFileFromCsvToJSON(pathCsvFile, pathJsonFile, csvLowercaseColumnHeaders, csvIgnoreColumnsColumnsReg) {
    await pipeline(
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
        }
    )
}

writeConvertibleFileFromCsvToJSON(csvFilePath, jsonFilePath, csvLowercaseColumnHeaders, csvIgnoreColumnsColumnsReg).catch(err => {
    logger(err);
});

function logger(message) {
    console.log(message);
}

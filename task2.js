const csvToJsonV2 = require("csvtojson");
const fs = require('fs');
const csvFilePath='./csvdirectory/example.csv';

csvToJsonV2()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        const a = jsonObj.map(item => {
           return {
               "book": item.Book,
               "author": item.Author,
               "price": item.Price
           }
        });

        fs.writeFile("test", JSON.stringify(a, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    });

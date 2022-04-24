const fs = require("fs");
const path = require("path");

module.exports.databaseNewData = yeah = (file, message) => {
    const user = message.author.id
    
    fs.appendFileSync(
        path.join(__dirname, file),
        `\n${Math.floor(Math.random() * 3) + 2}${
            Math.floor(Math.random() * 4) + 1
        },1,0,0,${user},false,false`
    );
}  
const fs = require("fs")
const path = require("path")

const database = (file, valueToChange, value, message, method, amount) => {
    let user = message.author.id;
    let data = fs.readFileSync(
        path.join(__dirname, file),
        "utf8"
    );

    let index = data.split(",").indexOf(valueToChange);

    let dataArray = data.split("\n").slice(1);
    let found = false;
    // check if the user is already in the database
    for (let i = 0; i < dataArray.length; i++) {
        let dataArray2 = dataArray[i].split(",");
        if (dataArray2[4] == user) {
            found = true;
            // change a value
            console.log(method)
            if (method == "increase") {
                if (!isNaN(amount)) {
                    dataArray2[index] = parseInt(dataArray2[index]) + amount;
                }
            } else if (method == "decrease") {
                if (!isNaN(amount)) {
                    dataArray2[index] = parseInt(dataArray2[index]) - amount;
                }
            } else if (method == "set") {
                dataArray2[index] = value;
            }
            // write the new data to the file
            fs.writeFileSync(
                path.join(__dirname, file),
                data.replace(dataArray[i], dataArray2),
            );
            break;
        }
    }
    if (!found) {
        message.channel.send("You don't have any data.")
    }
}

module.exports.database = database
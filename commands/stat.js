const { MessageEmbed } = require("discord.js");

const fs = require("fs")
const path = require("path")

module.exports = {
    name: "stat",
    aliases: ["stats"],
    description: "Get your stats in the game.",
    callback(client, message, args) {
        // get the database
        const user = message.author.id
        const data = fs.readFileSync(
            path.join(__dirname, "../data/data.csv"),
            "utf8"
        )
        // get the data array
        let dataArray = data.split("\n").slice(1)
        let found = false

        const embed = new MessageEmbed()
            .setTitle("Stats")
            .setColor("#0099ff")
            .setTimestamp()
        // check if the user is already in the database
        for (let i = 0; i < dataArray.length; i++) {
            let dataArray2 = dataArray[i].split(",");
            if (dataArray2[4] == user) {
                found = true;
                message.channel.send({
                    embeds: [
                        new MessageEmbed(embed)
                            .setDescription(
                                `Current status for <@!${user}>`
                            )
                            .setFields(
                                { name: "Apples collected:", value: dataArray2[2], inline: true},
                                { name: "Enemies killed:", value: dataArray2[3], inline: true },
                                { name: "Current level: ", value: dataArray2[1], inline: true },
                            )
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    ]
                })
                break;
            }
        }
        if (!found) {
            let newString = `${Math.floor(Math.random() * 3) + 2}${
                Math.floor(Math.random() * 4) + 1
            },1,0,0,${user},false,false`;

            let dataArray2 = newString.split(",");

            fs.appendFileSync(
                path.join(__dirname, "../data/data.csv"),
                `\n${newString}`
            );

            message.channel.send({
                embeds: [
                    new MessageEmbed(embed)
                        .setDescription(
                            `Current status for <@!${user}>`
                        )
                        .setFields(
                            { name: "Apples collected:", value: dataArray2[2], inline: true},
                            { name: "Enemies killed:", value: dataArray2[3], inline: true },
                            { name: "Current level: ", value: dataArray2[1], inline: true },
                        )
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                ]
            })
        }
    }
}
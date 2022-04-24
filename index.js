require("module-alias/register");
require("dotenv").config();
const { Client, MessageEmbed, MessageAttachment, Collection } = require("discord.js");
const client = new Client({
    intents: 1537,
});
const path = require("path");
const fs = require("fs");

// make a command handler with aliases
client.commands = new Collection();
client.aliases = new Collection();
const commandsFolder = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (file of commandsFolder) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Loaded ${client.commands.size} commands!`);
    client.user.setActivity("the Gameboy Omega", { type: "PLAYING" });

    const randomSayings = [
        "I'm a bot!",
        "Fight me! PeanutBotter and 20 Addons!",
        "Griffpatch is the best!",
        "<:appelRight:957310841827504188><:punch:962121524830167172><a:EnemyLeft:957310841806553168>",
        "i kinda forgor 💀",
    ];

    let randomSaying =
        randomSayings[Math.floor(Math.random() * randomSayings.length)];

    const testChannel = client.channels.cache.get("957299356212539542");
    let dependencies = "";
    for (const [key, value] of Object.entries(
        require("./package.json").dependencies
    )) {
        dependencies += `${key}@${value}\n`;
    }
    testChannel.send({
        embeds: [
            new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle("Bot restarted.")
                // add a dependencies to the embed
                .setDescription(
                    `Version is ${
                        require("./package.json").version
                    }\n\nDependencies used:\n**${dependencies}**\n${randomSaying}`
                )
                .setThumbnail(
                    "https://user-images.githubusercontent.com/78447219/162547857-3277dc69-2598-4154-8bd3-5f9f088a0b46.png"
                )
                .setTimestamp(),
        ],
    });

    // send the csv file to the channel if there isnt one
    const csvFile = path.join(__dirname, "./data/data.csv");
    const databaseChannel = client.channels.cache.get(
        process.env.DATABASE_CHANNEL
    );
    // check if the bot has a message in the database channel
    databaseChannel.messages.fetch({ limit: 1 }).then(async (messages) => {
        if (messages.size == 0) {
            // if there isnt a message, send the csv file
            databaseChannel
                .send({
                    content:
                        "**DATABASE**,\n\nDo not delete or unpin this message! If you do, the data will be cleared.",
                    files: [new MessageAttachment(csvFile, "data.csv")],
                })
                .then((message) => {
                    message.pin();
                });
        }
    });

    databaseChannel.messages
        .fetchPinned({ limit: 1 })
        .then(async (messages) => {
            if (messages.size == 1) {
                const message = messages.first();
                message.edit({
                    files: [new MessageAttachment(csvFile, "data.csv")],
                });
                fs.watchFile(csvFile, (curr, prev) => {
                    // if the file is updated, edit the pinned message
                    message.edit({
                        files: [new MessageAttachment(csvFile, "data.csv")],
                    });
                });
            }
        })
        .catch((err) => console.log(err));
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.cleanContent.toLowerCase().startsWith(process.env.PREFIX)) {
        const args = message.content
            .slice(process.env.PREFIX.length)
            .split(" ");
        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );
        if (!command) return;
        try {
            command.callback(client, message, args);
        } catch (e) {
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Oops!")
                        .setColor("RED")
                        .setDescription(
                            `Apparently there was an error!\n\`\`\`${e}\`\`\``
                        ),
                ],
            });
        }
    }
});

client.login(process.env.TOKEN);

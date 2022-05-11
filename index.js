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

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const { randomMessage } = require("@util/messages")

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "List of what to do and the commands.",
    callback(client, message, args) {
        (async () => {
            let colEnded = false;
            let page = 1;
            let pages = [
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setTitle("Gameplay")
                    .setDescription("Gameplay features are displayed as shown.")
                    .addFields(
                        {
                            name: "Player (Appel)",
                            value: `<:appelRight:957310841827504188> is you! Use the buttons to move him around.`, // <:Stand:951898762098380892>
                        },
                        {
                            name: "Enemy",
                            value: `<a:EnemyRight:957310841949126746> is the enemy. He goes left to right in the level. If you go through him, you'll die`, // <a:EnemyRight:954093352062705674>
                        },
                        {
                            name: "Apples",
                            value: `If you collect all <:goldenApple:957310842112712754>s, you can unlock the next level!`, // <:Apple:951950093722984478>
                        },
                        {
                            name: "Levels",
                            value: "Each level has a certain amount of apples. All levels are **technically** randomized",
                        }
                    ),
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setTitle("Controls")
                    .setDescription(
                        `Use the left and right arrow buttons to move the player.\nUse the jump button (🔼) when you are close to the enemy (You must be facing in the direction in front of him)\nYou can also jump on platforms (or obstacles) to get higher and collect apples.\nHowever, if you're below a platform, you **cannot** kill the enemy.\n\nTo start playing, type in ${process.env.PREFIX}appel`
                    )
                    .setImage(
                        "https://user-images.githubusercontent.com/78447219/160250546-4c7548a1-42ed-4ed0-b027-a109e521456c.png"
                    ),
                new MessageEmbed()
                    .setColor("BLURPLE")
                    .setTitle("Commands")
                    .setDescription("These are the commands you can use")
                    .addFields(
                        {
                            name: `${process.env.PREFIX}help`,
                            value: "Shows this help menu",
                        },
                        // {
                        //     name: `${process.env.PREFIX}defaultEmojis`,
                        //     value: "Toggle if you want to see default emojis instead of custom.",
                        // },
                        {
                            name: `${process.env.PREFIX}appel`,
                            value: "Finally, actually starts the game",
                        }
                    ),
            ];

            const getRow = (page) => {
                const row = new MessageActionRow().addComponents([
                    new MessageButton()
                        .setCustomId("Left")
                        .setEmoji("◀")
                        .setStyle("PRIMARY")
                        .setDisabled(colEnded ? true : page - 1 === 0),
                    new MessageButton()
                        .setCustomId("Right")
                        .setEmoji("▶")
                        .setStyle("PRIMARY")
                        .setDisabled(
                            colEnded ? true : page - 1 === pages.length - 1
                        ),
                ]);

                return row;
            };

            try {
                const msg = await message.reply({
                    embeds: [
                        new MessageEmbed(pages[page - 1]).setFooter({
                            text: `Page ${page} of ${pages.length}`,
                        }),
                    ],
                    components: [getRow(page)],
                });

                const filter = (buttonmessage) => {
                    if (buttonmessage.user.id === message.author.id)
                        return true;
                    return buttonmessage.reply({
                        content: randomMessage(),
                        ephemeral: true,
                    });
                };

                const collector = msg.createMessageComponentCollector({
                    filter,
                    idle: 15000,
                });

                collector.on("collect", (buttonmessage) => {
                    buttonmessage.deferUpdate();
                    if (buttonmessage.customId === "Left") {
                        page--;
                    } else if (buttonmessage.customId === "Right") {
                        page++;
                    }

                    msg.edit({
                        embeds: [
                            new MessageEmbed(pages[page - 1]).setFooter({
                                text: `Page ${page} of ${pages.length}`,
                            }),
                        ],
                        components: [getRow(page)],
                    });
                });

                collector.on("end", () => {
                    colEnded = true;
                    msg.edit({
                        embeds: [
                            new MessageEmbed(pages[page - 1]).setFooter({
                                text: `Page ${page} of ${pages.length}`,
                            }),
                        ],
                        components: [getRow(page)],
                    });
                });
            } catch (error) {
                console.error(error);
            }
        })();
    },
};

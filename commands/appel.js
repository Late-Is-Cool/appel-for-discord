const {
    MessageEmbed,
    MessageAttachment,
    MessageActionRow,
    MessageButton,
} = require("discord.js");

let Canvas = require("canvas");
let fs = require("fs");
let path = require("path");
const { randomMessage } = require("@util/messages")
let { database } = require("@util/fileAndValueToChange");

module.exports = {
    name: "appel",
    aliases: ["play", "game"],
    description: "Play the Discord version of Appel.",
    async callback(client, message, args) {
        let applesFound;
        let applesNeeded;

        async function newGame(groundHeight, obstaclesNumber, levelNumber) {
            let inGame;
            let enemyDied;
            let playerDied;
            let win;
            applesNeeded;
            applesFound = 0;
            const width = 21; // 15
            const height = 15; // 12
            const square = 50;
            const canvas = Canvas.createCanvas(width * square, height * square);
            const ctx = canvas.getContext("2d");

            let appelRight = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/163282010-b6a04d4a-0fbb-449e-b296-e35a0c76a293.png"
            );
            let appelLeft = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/163282008-743df945-f6ce-4ae2-9f0d-25fb5482d513.png"
            );
            let appleImage = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/163693352-7c2df72a-cc89-4c0e-93a7-a5ac88ed2f26.png"
            );
            let flagImage = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/163693354-62738a7a-4128-4c33-8025-fc816b84f370.png"
            );
            let goldenPotatoImage = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/163711916-48a92ad4-ccf6-4808-a023-583ce6bc357b.png"
            );
            let cubotImage = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/163693926-61516359-fd38-40b4-96d9-13e689194dd2.png"
            );
            let deadPlayer = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/163723648-8af239db-7f4f-4855-92a9-2cedc6ec3a0a.png"
            );

            let obstaclesList = [
                (obstacles1 = [
                    (ob1 = {
                        x: 2,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    (ob2 = {
                        x: 3,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob3 = {
                        x: 4,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob4 = {
                        x: 2,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    (ob5 = {
                        x: 5,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob6 = {
                        x: 6,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    (ob6 = {
                        x: 7,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                ]),
                (obstacles2 = [
                    (ob1 = {
                        x: 3,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    (ob2 = {
                        x: 4,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob3 = {
                        x: 5,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob4 = {
                        x: 6,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob5 = {
                        x: 7,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob6 = {
                        x: 8,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    //
                    (ob7 = {
                        x: 6,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    (ob8 = {
                        x: 7,
                        y: height - groundHeight - 4,
                        edge: false,
                        platform: true,
                    }),
                    (ob9 = {
                        x: 8,
                        y: height - groundHeight - 4,
                        edge: false,
                        platform: true,
                    }),
                    (ob10 = {
                        x: 9,
                        y: height - groundHeight - 4,
                        edge: false,
                        platform: true,
                    }),
                    (ob11 = {
                        x: 10,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    //
                    (ob12 = {
                        x: 6,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                    (ob13 = {
                        x: 5,
                        y: height - groundHeight - 6,
                        edge: false,
                        platform: true,
                    }),
                    (ob14 = {
                        x: 4,
                        y: height - groundHeight - 6,
                        edge: false,
                        platform: true,
                    }),
                    (ob15 = {
                        x: 3,
                        y: height - groundHeight - 6,
                        edge: false,
                        platform: true,
                    }),
                    (ob16 = {
                        x: 2,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                    (ob17 = {
                        x: 1,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                ]),
                (obstacles3 = [
                    (ob1 = {
                        x: 2,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    (ob2 = {
                        x: 3,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob3 = {
                        x: 4,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob4 = {
                        x: 5,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob5 = {
                        x: 6,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob6 = {
                        x: 7,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob7 = {
                        x: 8,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    //
                    (ob8 = {
                        x: 3,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    (ob9 = {
                        x: 4,
                        y: height - groundHeight - 4,
                        edge: false,
                        platform: true,
                    }),
                    (ob10 = {
                        x: 5,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    //
                    (ob11 = {
                        x: 1,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                    (ob12 = {
                        x: 2,
                        y: height - groundHeight - 6,
                        edge: false,
                        platform: true,
                    }),
                    (ob13 = {
                        x: 3,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                ]),
                (obstacles4 = [
                    (ob1 = {
                        x: 1,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    (ob2 = {
                        x: 4,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    (ob3 = {
                        x: 5,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob4 = {
                        x: 6,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob5 = {
                        x: 7,
                        y: height - groundHeight - 2,
                        edge: false,
                        platform: true,
                    }),
                    (ob6 = {
                        x: 8,
                        y: height - groundHeight - 2,
                        edge: true,
                        platform: false,
                    }),
                    //
                    (ob7 = {
                        x: 2,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    (ob8 = {
                        x: 3,
                        y: height - groundHeight - 4,
                        edge: false,
                        platform: false,
                    }),
                    (ob9 = {
                        x: 8,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    (ob10 = {
                        x: 9,
                        y: height - groundHeight - 4,
                        edge: false,
                        platform: true,
                    }),
                    (ob11 = {
                        x: 10,
                        y: height - groundHeight - 4,
                        edge: false,
                        platform: true,
                    }),
                    (ob12 = {
                        x: 11,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    (ob17 = {
                        x: 4,
                        y: height - groundHeight - 4,
                        edge: true,
                        platform: false,
                    }),
                    //
                    (ob13 = {
                        x: 3,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                    (ob14 = {
                        x: 11,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                    (ob15 = {
                        x: 12,
                        y: height - groundHeight - 6,
                        edge: false,
                        platform: true,
                    }),
                    (ob16 = {
                        x: 13,
                        y: height - groundHeight - 6,
                        edge: true,
                        platform: false,
                    }),
                ]),
            ];

            let appleLocationsList = [
                (applesLocation1 = [
                    (apple1 = {
                        x: 2,
                        y: height - groundHeight - 5,
                    }),
                    (apple2 = {
                        x: 4,
                        y: height - groundHeight - 3,
                    }),
                    (apple3 = {
                        x: 7,
                        y: height - groundHeight - 5,
                    }),
                ]),
                (appleLocations2 = [
                    (apple1 = {
                        x: 7,
                        y: height - groundHeight - 3,
                    }),
                    (apple2 = {
                        x: 9,
                        y: height - groundHeight - 5,
                    }),
                    (apple3 = {
                        x: 1,
                        y: height - groundHeight - 7,
                    }),
                ]),
                (appleLocations3 = [
                    (apple1 = {
                        x: 1,
                        y: height - groundHeight - 7,
                    }),
                    (apple2 = {
                        x: 3,
                        y: height - groundHeight - 5,
                    }),
                    (apple3 = {
                        x: 8,
                        y: height - groundHeight - 3,
                    }),
                ]),
                (appleLocations4 = [
                    (apple1 = {
                        x: 8,
                        y: height - groundHeight - 3,
                    }),
                    (apple2 = {
                        x: 3,
                        y: height - groundHeight - 5,
                    }),
                    (apple3 = {
                        x: 3,
                        y: height - groundHeight - 7,
                    }),
                    (apple4 = {
                        x: 11,
                        y: height - groundHeight - 5,
                    }),
                    (apple5 = {
                        x: 13,
                        y: height - groundHeight - 7,
                    }),
                ]),
            ];

            obstacleLength = obstaclesList.length;

            const obstacles = obstaclesList[obstaclesNumber - 1];
            const appleLocations = appleLocationsList[obstaclesNumber - 1];

            applesNeeded = appleLocations.length;

            let player = {
                x: 0,
                y: height - groundHeight - 1,
                direction: "Right",
            };

            let enemy = {
                x: width - 1,
                y: height - groundHeight - 1,
                direction: "Left",
            };

            let flag = {
                x: width - 1,
                y: height - groundHeight - 1,
            };

            let cubot = {
                x: 9,
                y: height - groundHeight - 1,
            };

            let groundEyes = [];
            for (let i = 0; i < width; i++) {
                // let j = 0
                if (Math.round(Math.random()) === 0) {
                    groundEyes.push({ x: i - 1, y: height - groundHeight });
                }
            }

            // functions
            inGame = true;
            enemyDied = false;
            playerDied = false;
            win = false;

            let cubotRandomize = Math.random();

            const enemyLeft = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/164821135-c6842e8b-41fb-43cf-b21d-4f2ca17e1267.png"
            );
            const enemyRight = await Canvas.loadImage(
                "https://user-images.githubusercontent.com/78447219/164817587-62d5b5a6-461f-4645-b0dd-f1db5c266e3e.png"
            );

            const updateGrid = async () => {
                for (let i = 0; i < width; i++) {
                    for (let j = 0; j < height; j++) {
                        if (j < height - groundHeight) {
                            if (
                                obstacles.some(
                                    (obstacle) =>
                                        obstacle.x === i && obstacle.y === j
                                )
                            ) {
                                ctx.fillStyle = "#39b54a";
                                ctx.fillRect(
                                    i * square,
                                    j * square,
                                    square,
                                    square
                                );
                            } else if ((i + j) % 2 == 0) {
                                ctx.fillStyle = "#d4edf4";
                            } else {
                                ctx.fillStyle = "#e1f5fa";
                            }
                        } else {
                            ctx.fillStyle = "#39b54a";
                        }
                        ctx.fillRect(i * square, j * square, square, square);
                        if (player.x == i && player.y == j && !playerDied) {
                            if (player.direction == "Right") {
                                ctx.drawImage(
                                    appelRight,
                                    player.x * square + square * 0.125,
                                    player.y * square,
                                    square * 0.75,
                                    square
                                );
                            } else {
                                ctx.drawImage(
                                    appelLeft,
                                    player.x * square + square * 0.125,
                                    player.y * square,
                                    square * 0.75,
                                    square
                                );
                            }
                        } else if (enemy.x == i && enemy.y == j && !enemyDied) {
                            if (enemy.direction == "Right") {
                                ctx.drawImage(
                                    enemyRight,
                                    enemy.x * square + square * 0.125,
                                    enemy.y * square + square * 0.1245,
                                    square * 0.75,
                                    square * 0.85
                                );
                            } else {
                                ctx.drawImage(
                                    enemyLeft,
                                    enemy.x * square + square * 0.125,
                                    enemy.y * square + square * 0.1245,
                                    square * 0.75,
                                    square * 0.85
                                )
                            }
                        } else if (flag.x == i && flag.y == j) {
                            ctx.drawImage(
                                flagImage,
                                flag.x * square + square * 0.125,
                                flag.y * square,
                                square * 0.75,
                                square
                            );
                        } else if (
                            appleLocations.some(
                                (apple) => apple.x === i && apple.y === j
                            )
                        ) {
                            if (Math.random() < 0.000001) {
                                // 0.000001
                                ctx.drawImage(
                                    goldenPotatoImage,
                                    // set the apple to the middle
                                    i * square + square * 0.2,
                                    j * square + square * 0.2,
                                    square * 0.6,
                                    square * 0.6
                                );
                            } else {
                                ctx.drawImage(
                                    appleImage,
                                    i * square + square * 0.2,
                                    j * square + square * 0.2,
                                    square * 0.6,
                                    square * 0.6
                                );
                            }
                        } else if (
                            cubotRandomize < 0.01 &&
                            i === cubot.y &&
                            j === cubot.x
                        ) {
                            ctx.drawImage(
                                cubotImage,
                                i * square,
                                j * square + square * 0.25,
                                square,
                                square
                            );
                        } else if (
                            obstacles.some(
                                (obstacle) =>
                                    obstacle.x === i && obstacle.y === j
                            )
                        ) {
                            ctx.fillStyle = "#3ac54d";
                            ctx.fillRect(
                                i * square + square / 4,
                                j * square + square / 4,
                                square / 2,
                                square / 2
                            );
                        } else if (
                            playerDied &&
                            player.x === i &&
                            player.y === j
                        ) {
                            ctx.drawImage(
                                deadPlayer,
                                i * square,
                                j * square,
                                square,
                                square
                            );
                        }
                        if (j > height - groundHeight - 1) {
                            ctx.fillStyle = "#3ac54d";
                            ctx.fillRect(
                                i * square + square / 4,
                                j * square + square / 4,
                                square / 2,
                                square / 2
                            );
                        }
                    }
                }
            };

            updateGrid()

            const getEmbeds = () => {
                let embed = new MessageEmbed()
                    .setTitle(`Appel (Level ${levelNumber})`)
                    .setImage(`attachment://appel.png`)
                    .setColor(0x7289da)
                    .setFooter({
                        text: `Apples found: ${applesFound}/${applesNeeded}`,
                    });

                return embed;
            };

            const getGameOverEmbed = () => {
                return new MessageEmbed()
                    .setColor(win ? "GREEN" : "RED")
                    .setTitle(win ? "You win!" : "You Lost!")
                    .setDescription(
                        win
                            ? `Run ${process.env.PREFIX}appel to play the next level!`
                            : `Run ${process.env.PREFIX}appel to try to win!`
                    );
            };

            const getControlButtons = () => {
                return new MessageActionRow().addComponents([
                    new MessageButton()
                        .setCustomId("Left")
                        .setEmoji("◀")
                        .setStyle("PRIMARY")
                        .setDisabled(!inGame),
                    new MessageButton()
                        .setCustomId("Jump")
                        .setEmoji("🔼")
                        .setStyle("PRIMARY")
                        .setDisabled(!inGame),
                    new MessageButton()
                        .setCustomId("Right")
                        .setEmoji("▶")
                        .setStyle("PRIMARY")
                        .setDisabled(!inGame),
                ]);
            };

            const msg = await message.channel.send({
                files: [
                    new MessageAttachment(
                        canvas.toBuffer(),
                        `attachment://appel.png`
                    ),
                ],
                embeds: [getEmbeds()],
                components: [getControlButtons()],
            });

            const gameOver = (result) => {
                inGame = false;
                msg.edit({
                    files: [
                        new MessageAttachment(
                            canvas.toBuffer(),
                            `attachment://appel.png`
                        ),
                    ],
                    embeds: [getEmbeds()],
                    components: [getControlButtons()],
                });
                if (result.cause == "WonTheLevel") {
                    win = true;
                    database(
                        "../data/data.csv",
                        "level",
                        `${Math.floor(Math.random() * 3) + 2}${
                            Math.floor(Math.random() * 4) + 1
                        }`,
                        message,
                        "set",
                        false
                    );
                    database(
                        "../data/data.csv",
                        "levelNumber",
                        "idk",
                        message,
                        "increase",
                        1
                    );
                    database(
                        "../data/data.csv",
                        "apples",
                        "idk",
                        message,
                        "increase",
                        applesFound
                    );
                    if (enemyDied) {
                        database(
                            "../data/data.csv",
                            "enemiesKilled",
                            "idk",
                            message,
                            "increase",
                            1
                        );
                    }
                } else {
                    win = false;
                    playerDied = true;
                }
                updateGrid();
                msg.edit({
                    files: [
                        new MessageAttachment(
                            canvas.toBuffer(),
                            `attachment://appel.png`
                        ),
                    ],
                    embeds: [getEmbeds(), getGameOverEmbed()],
                });
                enemyDied = false;
            };

            let playerY = 0;
            let sideScrollX = false;
            let sideScrollY = false;

            const step = () => {
                // check if the player is in the middle of the canvas
                if (player.x > width / 2) {
                    sideScrollX = true;
                } else {
                    sideScrollX = false;
                }
                if (player.y < height / 2) {
                    sideScrollY = true;
                } else {
                    sideScrollY = false;
                }
                console.log(sideScrollX, sideScrollY);

                let enemyLastX = enemy.x;
                if (
                    !obstacles.find(
                        (obstacle) =>
                            obstacle.y === player.y + 1 &&
                            obstacle.x === player.x
                    ) &&
                    player.y !== height - groundHeight - 1
                ) {
                    if (
                        obstacles.find(
                            (obstacle) =>
                                obstacle.y == player.y + 3 &&
                                obstacle.x == player.x
                        )
                    ) {
                        player.y += 2;
                        playerY--;
                    } else {
                        for (let i = 0; i < playerY; i++) {
                            player.y += 2;
                        }
                        playerY = 0;
                    }
                    // if (player.x === enemy.x) {
                    //     enemyDied = true;
                    //     enemy.x = enemyLastX;
                    // }
                }
                if (!enemyDied) {
                    if (enemy.direction === "Left") {
                        enemy.x--;
                        if (enemy.x === 0) {
                            enemy.direction = "Right";
                        }
                    } else if (enemy.direction === "Right") {
                        enemy.x++;
                        if (enemy.x === width - 1) {
                            enemy.direction = "Left";
                        }
                    }
                }

                if (
                    // check if the player's direction is the opposite of the enemy's direction
                    (player.x == enemy.x || player.x == enemyLastX) &&
                    player.y == enemy.y &&
                    player.direction !== enemy.direction &&
                    !enemyDied
                ) {
                    gameOver({ cause: "DiedFromEnemy" });
                    return;
                } else if (player.x == flag.x && player.y == flag.y) {
                    gameOver({ cause: "WonTheLevel" });
                    return;
                } else if (
                    appleLocations.find(
                        (apple) => player.x === apple.x && player.y === apple.y
                    )
                ) {
                    applesFound++;
                    appleLocations.splice(
                        appleLocations.findIndex(
                            (apple) =>
                                apple.x === player.x && apple.y === player.y
                        ),
                        1
                    );
                }
                updateGrid();
                msg.edit({
                    files: [
                        new MessageAttachment(
                            canvas.toBuffer(),
                            `attachment://appel.png`
                        ),
                    ],
                    embeds: [getEmbeds()],
                    components: [getControlButtons()],
                });
            };

            const jump = () => {
                if (
                    ((player.x == enemy.x - 1 && player.direction == "Right") ||
                        (player.x == enemy.x + 1 &&
                            player.direction == "Left")) &&
                    player.y == enemy.y &&
                    !enemyDied &&
                    !obstacles.find(
                        (obstacle) =>
                            obstacle.y === player.y - 1 &&
                            obstacle.x === player.x
                    )
                ) {
                    enemyDied = true;
                } else if (
                    obstacles.find(
                        (obstacle) =>
                            obstacle.x === player.x + 1 &&
                            obstacle.y === player.y - 1 &&
                            obstacle.edge === true
                    ) &&
                    player.direction === "Right" &&
                    !obstacles.find(
                        (obstacle) =>
                            obstacle.y === player.y - 1 &&
                            obstacle.x === player.x
                    )
                ) {
                    player.x++;
                    player.y -= 2;
                    playerY++;
                } else if (
                    obstacles.find(
                        (obstacle) =>
                            obstacle.x === player.x - 1 &&
                            obstacle.y === player.y - 1 &&
                            obstacle.edge === true
                    ) &&
                    player.direction === "Left" &&
                    !obstacles.find(
                        (obstacle) =>
                            obstacle.y === player.y - 1 &&
                            obstacle.x === player.x
                    )
                ) {
                    player.x--;
                    player.y -= 2;
                    playerY++;
                }
            };

            const filter = (buttonmessage) => {
                if (buttonmessage.user.id === message.author.id) return true;
                return buttonmessage.reply({
                    content: randomMessage(),
                    ephemeral: true,
                });
            };

            const collector = msg.createMessageComponentCollector({
                filter,
                idle: 1000 * 15,
            });

            collector.on("collect", async (buttonmessage) => {
                await buttonmessage.deferUpdate();
                if (buttonmessage.customId == "Left") {
                    if (player.direction == "Right") {
                        player.direction = "Left";
                    } else {
                        if (player.x > 0) {
                            player.x--;
                        }
                    }
                } else if (buttonmessage.customId == "Jump") {
                    jump();
                } else if (buttonmessage.customId == "Right") {
                    if (player.direction == "Left") {
                        player.direction = "Right";
                    } else {
                        if (player.x < width - 1) {
                            player.x++;
                        }
                    }
                }
                if (inGame === true) {
                    step();
                }
            });
            collector.on("end", () => {
                if (inGame === true) gameOver({ cause: "ForcedDeath" });
                return;
            });
        }
        try {
            let user = message.author.id;
            let data = fs.readFileSync(
                path.join(__dirname, "../data/data.csv"),
                "utf8"
            );
            let dataArray = data.split("\n").slice(1);
            let found = false;

            if (dataArray.length == 0) {
                let newString = `${Math.floor(Math.random() * 3) + 2}${
                    Math.floor(Math.random() * 4) + 1
                },1,0,0,${user},false,false`;
                let dataArray2 = newString.split(",");

                let levelString = dataArray2[0].toString().split("");
                let digits = levelString.map(Number);
                fs.appendFileSync(
                    path.join(__dirname, "../data/data.csv"),
                    `\n${newString}`
                );
                found = true;
                newGame(digits[0], digits[1], dataArray2[1]);
            } else {
                for (let i = 0; i < dataArray.length; i++) {
                    let dataArray2 = dataArray[i].split(",");

                    let levelString = dataArray2[0].toString().split("");
                    let digits = levelString.map(Number);
                    if (dataArray2[4] == user) {
                        found = true;
                        newGame(digits[0], digits[1], dataArray2[1]);
                        break;
                    }
                }
                if (!found) {
                    let newString = `${Math.floor(Math.random() * 3) + 2}${
                        Math.floor(Math.random() * 4) + 1
                    },1,0,0,${user},false,false`;
                    let dataArray2 = newString.split(",");

                    let levelString = dataArray2[0].toString().split("");
                    let digits = levelString.map(Number);
                    fs.appendFileSync(
                        path.join(__dirname, "../data/data.csv"),
                        `\n${newString}`
                    );
                    newGame(digits[0], digits[1], dataArray2[1]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    },
};

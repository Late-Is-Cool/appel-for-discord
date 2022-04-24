const randomMessage = () => {
    const messages = [
        "You can't use this!",
        "Pick someone your own size! (shorty...)",
        "Your credit card has expired.",
        "no.",
        "Stop sabotaging! <:sus_appel:967509889603764234>",
        "L + ratio + you fell off",
        "https://cdn.discordapp.com/attachments/966706770812764260/967556930530856990/yt5s.com-It_literally_says_you_are_sus_arcade_craniacs_360p.mp4",
    ]

    return messages[Math.floor(Math.random() * messages.length)];
}

module.exports.randomMessage = randomMessage;
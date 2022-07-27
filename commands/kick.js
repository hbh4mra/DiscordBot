module.exports = {
    name: 'kick',
    permissions: ["KICK_MEMBERS"],
    description: "This command kicks a member",
    execute(message, args) {
        const target = message.mentions.users.first();

        if(target) {
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        } else {
            message.channel.send(`You couldn't kick that member!`);
        }
    }
}
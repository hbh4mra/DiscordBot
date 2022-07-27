module.exports = {
    name: 'reactionrole',
    permissions: [],
    description: "Sets up a reaction role message",
    async execute(client, message, args, Discord){
        const channel = '/*channel id*/';
        const roleOne = message.guild.roles.cache.find(role => role.id === '/*role1 id*/');
        const roleTwo = message.guild.roles.cache.find(role => role.id === '/*role2 id*/');

        const roleOneEmoji = ':white_check_mark:';
        const roleTwoEmoji = ':thumbsup:';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('React to this message!')
            .setDescription('Allows you to pick up this role!\n\n'
                + `${roleOneEmoji} for the win\n`
                + `${roleTwoEmoji} for the win`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(roleOneEmoji);
        messageEmbed.react(roleTwoEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === roleOneEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(roleOne);
                }
                if(reaction.emoji.name === roleTwoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(roleTwo);
                }
            } else {
                return;
            }

        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === roleOneEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(roleOne);
                }
            } else {
                return;
            }
        });
    }
}

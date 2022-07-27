const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    permissions: ["ADMINISTRATOR"],
    description: "Creates an embed!",
    execute(message, args, Discord){
        const newEmbed = new MessageEmbed()
        .setColor('#304281')
        .setTitle('Rules')
        .setURL('/*enter url*/')
        .setDescription('This is a embed for the server rules')
        .addFields(
            {name: 'Rule 1', value: 'Be nice'},
            {name: 'Rule 2', value: 'Follow Twitch'},
            {name: 'Rule 3', value: 'No memes'}
        )
        .setImage('https://blog.logomyway.com/wp-content/uploads/2020/12/discord-mascot.png')
        //.setTimestamp()
        .setFooter('Make sure to check out the rules channel');

        //message.channel.send(newEmbed);
        message.channel.send({embeds: [newEmbed]}).catch((err)=> {
            throw err;
        });

    }
}

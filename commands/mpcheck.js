require('dotenv').config();
const cod_api = require('call-of-duty-api')();

module.exports = {
    name: 'mpcheck',
    permissions: [],
    description: 'this command shows stats for call of duty multiplayer',
    async execute(client, message, args, Discord){
        if(!args[0]) return message.channel.send('Please enter a username');
        if(!args[1]) return message.channel.send('Please enter a platfrom');

        //Getting username and password from the .env file. If you don't have or need a .env file just hard code your username and password.
        let username = process.env.COD_USERNAME;
        let password = process.env.COD_PASSWORD;

        try{
            await cod_api.login(username, password);
            //Getting data from CWmp (Cold War Multiplayer) make sure to check the docs if you wish to get data from other games.
            let data = await cod_api.CWmp(args[0], args[1]);
            
            const embed = new Discord.MessageEmbed()
            .setColor('#BFCDEB')
            .setTitle('COD Multiplayer Stats')
            .setDescription('Cod stats')
            .addFields(
                { name: 'Games Played', value: data.lifetime.all.properties.totalGamesPlayed, inline: true},
                { name: 'Wins', value: data.lifetime.all.properties.wins, inline: true},
                { name: 'Losses', value: data.lifetime.all.properties.losses, inline: true},
                { name: 'KD Ratio', value: data.lifetime.all.properties.kdratio, inline: true},
                { name: 'Kills', value: data.lifetime.all.properties.kills, inline: true},
                { name: 'Deaths', value: data.lifetime.all.properties.deaths, inline: true},
                { name: 'Longest Kill Streak', value: data.lifetime.all.properties.longestKillstreak},
                {name: 'Total Time Played', value: (parseFloat(data.lifetime.all.properties.timePlayedTotal / 3600).toFixed(2)) + " Hours"}
            
            )
            .setFooter('COD stats by Codelyon');

            message.channel.send(embed);

            //I left the console.log so you can see the reponse we are getting. You can delete this if you wish.
            console.log(data.lifetime.all.properties);

        }catch(error){
            message.channel.send('There was an error fetching this player');
            throw error;
        }
    }
}

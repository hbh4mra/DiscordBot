const Discord = require('discord.js');                                                                  //Discord API too communicate with the node modules
require('dotenv').config();                                                                             //Allows the storage of environment variables
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });          //Creates Discord Bot called client
const mongoose = require('mongoose');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

//Establish a connection with MongoDB
mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
});

//Discord Bot Token
client.login(process.env.DISCORD_TOKEN);
module.exports = {
    name: 'youtube',
    permissions: [],
    description: "Sends the youtube link",
    execute(client, message, args){

        if(message.member.roles.cache.has('/*permission id*/')){
            message.channel.send('/*youtube url*/');
        } else {
            message.channel.send('You cant send this command. Insufficient permissions.');
            //Adds role
            message.member.roles.add('/*permission id*/').catch(console.error);
            //Removes role
            message.member.roles.remove('/*permission id*/');
        }
        
    }
}

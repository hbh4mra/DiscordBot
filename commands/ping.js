module.exports = {
    name: 'ping',
    permissions: [],
    description: "This is a ping command!",
    execute(message, args){
        message.channel.send('pong!');
    }
}
module.exports = async (client) => {
    const guild = client.guilds.cache.get('/*id of server*/');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('/*id of channel*/');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`)
        console.log('Updating Member Counter');
    }, 5000);
}

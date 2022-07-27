const profileModel = require("./../models/profileSchema");

module.exports = {
  name: "give",
  aliases: [],
  permissions: ["ADMINISTRATOR"],
  description: "give a player some coins",
  async execute(message, args, cmd, client, discord, profileData) {
    if (message.member.id != "/*admin user id*/") return message.channel.send(`Sorry only **ADMIN** can run this command 😔`);
    if (!args.length) return message.channel.send("You need to mention a player to give them coins");
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("That user does not exist");

    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(`This user doens't exist in the db`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );

      return message.channel.send(`This player has been given their coins! ${amount} of coins!`);
    } catch (err) {
      console.log(err);
    }
  },
};

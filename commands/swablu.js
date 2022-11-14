const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("swablu")
    .setDescription("Get Swablu's attention!"),
  async execute(interaction) {
    await interaction.reply("What? Huh? Oh hi!");
  },
};

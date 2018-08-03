const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {

const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  switch(command){

    case "announce":
      let channelid = args.slice(0,1).join(" "); //selects first argument, the channelid
      let text = args.slice(1).join(" "); //selects second argument, message
      message.delete(); //deletes command invocation message
      message.guild.channels.find("name", channelid).send(text); //sends message in the channel of the defined channelid
    break;

    case "hello":
      message.channel.send("hello");
    break;

    case "kick":
      const modRole = message.guild.roles.find("name", "Professors");

      if(!modRole)
          return console.log("Mod role does not exist!");

      if(!message.member.roles.has(modRole.id))
          return message.reply("You cannot use that command, pleb.");

      if (message.mentions.members.size === 0)
          return message.reply("Please mention a user to kick");
      
      if (!message.guild.me.hasPermission("KICK_MEMBERS"))
          return message.reply("");

      const kickMember = message.mentions.members.first();

      kickMember.kick(reason.join(" ")).then(member => {
          message.reply(`${member.user.username} was succesfully kicked.`);
      });



  }

  

});

client.login(config.token);
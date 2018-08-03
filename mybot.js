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

    case "kick": //kicks user, citing the reason given by the kicker

    let kickMember = message.mentions.members.first();
    let reason = args.slice(1).join(" "); 

    if(reason == ""){
      return message.reply("For what reason? Try again.");
    }
    // if (!message.guild.me.hasPermission("KICK_MEMBERS")){
    // return message.reply(" hello");
    // }

    kickMember.kick(reason).then(member => {
        message.reply(`${member.user.username} was succesfully kicked for `.send(reason));
    });

  }

  

});

client.login(config.token);
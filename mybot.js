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
    
    const modRole = message.guild.roles.find("name", "admin.dev");
    let kickMember = message.mentions.members.first();
    let reason = args.slice(1).join(" "); 

    if (!modRole){
      return console.log("The Mods role does not exist");
    }

    if (!message.member.roles.has(modRole.id)){
      return message.reply("You can't use this command.");
    }

    if(reason == ""){
      return message.reply("For what reason? Try again.");
    }

    kickMember.kick(reason).then(member => {
        message.reply(`${member.user.username} was succesfully kicked for ${reason}`);
    });

  }

  

});

client.login(config.token);
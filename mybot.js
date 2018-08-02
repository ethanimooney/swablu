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

  if(command === "announce"){ //announces a message to a given channel
    let channelid = args.slice(0,1).join(" "); //selects first argument, the channelid
    let text = args.slice(1,2).join(" "); //selects second argument, message
    message.delete(); //deletes command invocation message
    message.guild.channels.find("name", channelid).send(text); //sends message in the channel of the defined channelid
    }

});

client.login(config.token);
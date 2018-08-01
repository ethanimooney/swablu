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

  if(command === 'ping') {
    message.channel.send('Pong!');
    } else
  if (command === 'blah') {
    message.channel.send('Meh.');
    } else 
    if(command === "say"){
      let text = args.slice(1).join(" ");
      message.delete();
      message.channelID("general").send(text);
    }

});

client.login(config.token);
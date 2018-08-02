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
    message.channel.send('Meh nah.');
    } else 
  // if(command === "announce"){
  //   let text = args.slice(0).join(" ");
  //   message.delete();
  //   message.channelid("general").send(text);
  //   }
  if(command === "quote") {
    const [channelid, messageid, quotename, ...note] = args.splice(1);
    // I also support "here" as a channelID using this:
    const channel = channelid == "here" ? message.channel : client.channels.get(channelid);
    // I do the same with message ID, which can be "last":
    const message = messageid === "last" ? msg.channel.messages.last(2)[0] : await channel.messages.get(messageid);
    // pretend for a second this is the rest of the function:
    insertInDB(quotename, channel.id, message.id, note.join(" "));
  }

});

client.login(config.token);
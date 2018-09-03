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

    case "announce": //announces message specified in speified channel
      let channelid = args.slice(0,1).join(" "); //selects first argument, the channelid
      let text = args.slice(1).join(" "); //selects second argument, message
     
      if(!message.guild.channels.find("name", channelid)){//if specified channel does not exist or one is not specified, throws error
        return message.reply("looks like you did't specify a channel or you spelled it wrong, try again.");
      }
      if(text == ""){//if no text is given, throws error
        return message.reply("erm, what am I supposed to say? Try again.");
     }

      message.delete(); //deletes command invocation message
      message.guild.channels.find("name", channelid).send(text); //sends message in the channel of the defined channelid
    break;

    case "kick": //kicks user, citing the reason given by the kicker
    
    const modRole = message.guild.roles.find("name", "professors"); //finds mod role
    const botRole = message.guild.roles.find("name", "bots"); //finds botmod role
    let kickMember = message.mentions.members.first();
    let reason = args.slice(1).join(" "); 
    message.delete();

    if(kickMember.roles.has(modRole.id || botRole.id)){ //blocks kicking of a mod
      message.reply("You can't kick a mod, fool.")
    }
    if (!modRole){ //checks if there is a mod role in the server
      return console.log("The Mods role does not exist");
    }
    if (!message.member.roles.has(modRole.id)){ //checks if command user is mod
      return message.reply("You can't use this command.");
    }
    if(reason == ""){ //if no reason is supplied it asks for one
      return message.reply("For what reason? Try again.");
    }

    kickMember.kick(reason).then(member => { //kicks user and gives reason why
        message.channel.send(`${kickMember} was succesfully kicked for "${reason}"`);
    });
    break;

    case "clear"://clears a specified amount of messages from chat

    const swablu = client.emojis.find("name", "swablu");//creates swablu emoji

    let clearNumber = (args[0] + 1); //sets number to clear one higher so it deletes invocation message also
   
    if(!args[0]){
    return message.channel.send("Erm, how many? Try again.");
    }//if no amount to delete is given, throws error
    message.channel.bulkDelete((args[0] + 1)).then(() => {//does the deleting
    message.channel.send(`Cleared ${args[0]} messages. ${swablu}`).then(msg => msg.delete(5000));//sends conformation, then deletes conformation
  });
  break;

  case "ban":

  



  }

  

});

client.login(config.token);
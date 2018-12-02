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
    
    const modRole = message.guild.roles.find("name", "professors");
    const jrmodRole = message.guild.roles.find("name", "assistant professors"); //finds mod role
    const botRole = message.guild.roles.find("name", "bots"); //finds botmod role
    let kickMember = message.mentions.members.first();
    let reason = args.slice(1).join(" "); 
    message.delete();

    if(kickMember.roles.has(modRole.id || botRole.id || jrmodROle.id)){ //blocks kicking of a mod
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


    let clearNumber = parseInt(args[0], 10);//converts number to an int
    let actualNumber = (clearNumber + 1);//sets delete number to 1 higher so it deletes command invocation

    if(!args[0]){
      return message.channel.send("Erm, how many? Try again.");
    }//if no amount to delete is given, throws error

    message.channel.bulkDelete(actualNumber).then(() => {//does the deleting
    message.channel.send(`Cleared ${args[0]} messages. ${swablu}`).then(msg => msg.delete(5000));//sends conformation, then deletes conformation
  });
  break;

    case "junior": //gives junior role to sender
    
    message.delete();

    if(message.member.roles.has('472534724032724992') || message.member.roles.has('472534767024340993') || message.member.roles.has('472537891776626689')){
      message.channel.send('Aren\'t you already in a group? Contact a mod if you need a change! :swablu:');
    }
    else if(message.member.roles.has('472534683205500936')) {
      message.channel.send(`Uhh you already are one... ${swablu}`);
    }
    else{
      message.member.addRole('472534683205500936');
      message.channel.send('Welcome to the fun group!');
    }
  break;

  case "senior": //gives senior role to sender

    message.delete();

    if(message.member.roles.has('472534724032724992')) {
      message.channel.send(`Uhh you already are one... ${swablu}`);
    }
    else{
      message.member.addRole('472534724032724992');
      message.channel.send('Welcome to the cool kids.');
    }
  break;

  case "master": //gives master role to sender

    message.delete();

    if(message.member.roles.has('472534767024340993')) {
      message.channel.send(`Uhh you already are one... ${swablu}`);
    }
    else{
      message.member.addRole('472534767024340993');
      message.channel.send('Welcome to the real OG\'s.');
    }
  break;

  case "parent": //gives parent role to sender

    message.delete();

    if(message.member.roles.has('472537891776626689')) {
      message.channel.send(`Uhh you already are one... ${swablu}`);
    }
    else{
      message.member.addRole('472537891776626689');
      message.channel.send('Welcome to the best group.');
    }
  break;

  case "prices": //sends a list of common price sites

    message.channel.send('TCG Player : https://bit.ly/2wBWSk7');

  break;

  case "proxies": //sends a list of proxy sites

    message.channel.send('Limitless : https://bit.ly/2MLcexB \nProxycroak (Japanese Proxies) : https://bit.ly/2LUMmtQ');

  break;

  case "rotation": //sends the current rotation

    message.channel.send('The 2019 Standard Rotation is Sun and Moon Base Set - Current. \nFind the current TCG Standard Rotation here : http://bit.ly/2NQckQD');

  break;

  case "location":

    message.channel.send('We meet most Saturdays at Al\'s Sports Cards & Gaming.\n\nHere\'s the address!\n16 E 15th St, Edmond, OK 73013');

  break;

  case "playerid":

    message.channel.send('Find or create a player id here : http://bit.ly/2v9RIve');

  break;

  case "facebook":

    message.channel.send('Find out Facebook page here : www.facebook.com/pokemonedmond/');

  break;

  case "commands":

    message.channel.send('!prices -  sends list of price sites\n!proxies - sends list of proxy sites\n!playerid - sends link to create or find your player id\n!rotation - sends link to current rotation\n!location - sends the location of our meetup space\n!facebook - sends a link to our Facebook page');

  break;

  case "acommands":

    message.channel.send('!ban -- bans user\n!tempban -- temporarily bans a user from the server\n!clear -- clears X messages from a chat\n!infractions -- displays a user\'s infractions\n!kick -- kicks user\n!mute -- mutes user\n!tempmute -- temporarily mutes user\n!role-info -- gives info on a role\n!server-info -- gives info about the server\n!slowmode -- enables/disables slow mode\n!unmute -- unmutes a user\n!user-info -- gives info on user\n!warn -- warns a user');

  break;

  case "swablu":

    message.channel.send('Huh? What? ${swablu}');

  break;
  }



  

});

client.login(config.token);
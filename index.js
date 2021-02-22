// highlight-next-line
require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()
const keep_alive = require('./keep_alive.js')

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content === "!ping") {
    msg.reply("Pong!")
  }
})

client.on("guildMemberAdd", (member) => {
  member.send(
    `Welcome on the server! Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
})

client.on("message", (message) => {
  if (message.content.startsWith("!kick")) {
    const member = message.mentions.members.first()
    if (!member) {
      return message.reply(
        `Who are you trying to kick? You must mention a user.`
      )
    }
    if (!member.kickable) {
      return message.reply(`I can't kick this user. Sorry!`)
    }
    return member
      .kick()
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch((error) => message.reply(`Sorry, an error occured.`))
  }
})

client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '!av') {
    // Send the user's avatar URL
    message.reply(message.author.displayAvatarURL());
  }
})

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('!ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
});

client.on('message', message => {
  // If the message is "ping"
  if (message.content === "!daddy") {
    // Send "pong" to the same channel
    message.channel.send('Mayz is Daddy');
  }
});

client.once('ready', () => {
	console.log('I am running');
	client.user.setPresence({ activity: { name: `${client.guilds.cache.size} Servers`, type: 'WATCHING' }, status: 'dnd' });
	client.users.cache.get('249638347306303499').send('ey *cunt* i started');
	client.channels.cache.get('812082273393704960').send('Started Successfully!');
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && args.length < command.argamnt) {
		const Usage = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Usage')
			.setDescription(`\`${config.prefix + command.name + ' ' + command.usage}\``);
		return message.channel.send(Usage);
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('You can only execute this command in a Discord Server!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can\'t do that!');
		}
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		const random = Math.floor(Math.random() * 5);
		const messages = ['Do I look like Usain Bolt to u?', 'BRUH IM JUST A DOG SLOW DOWN', 'can u not', 'leave me alone ;-;'];
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply({ embed: {
				color: 15158332,
				title: messages[random],
				description: `wait ${timeLeft.toFixed(1)} more seconds before reusing ${config.prefix + command.name}.`,
			} });
		}
	}

	try {
		if (message.author.id !== '249638347306303499') client.users.cache.get('249638347306303499').send(`**COMMAND: ${message.author.tag} >** ${message.content}`);
		command.execute(message, args, client, sleep, config, Client, Discord);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on("message", (msg) => {
  if (msg.content === "!invite") {
    msg.reply("https://discord.com/api/oauth2/authorize?client_id=813239551388549180&permissions=8&scope=bot")
  }
})

// highlight-next-line
client.login(process.env.BOT_TOKEN)

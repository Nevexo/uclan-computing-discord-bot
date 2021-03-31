// 
// UCLan Computing 2020 Discord Bot
// MIT License - Cameron Fleming 2021
//

// Help command needs access to the 'commands' table from bot.js
// TODO: make this pretty.

import { Message } from 'discord.js';
import { commands } from '../bot';

const HelpCommand = async (message: Message, args: string[]) => {
  let responseText: string = "```";
  
  commands.array().forEach((cmd: any) => {
    responseText += "- " + cmd['name'];
    responseText += "\n" + cmd['description'] + "\n";
  })

  responseText += "```";

  await message.channel.send(responseText);
}

export default {
  "name": "help",
  "description": "Get command help information",
  "execute": HelpCommand
}
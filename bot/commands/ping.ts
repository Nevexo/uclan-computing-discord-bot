// 
// UCLan Computing 2020 Discord Bot
// MIT License - Cameron Fleming 2021
//

// Ping command - a simple test command that returns "pong" whenever a user executes the "ping" command.
// This mostly exists for testing the functionailty of command loading.

import { Message } from 'discord.js';
import { logger } from '../bot';

const PingCommand = async (message: Message, args: string[]) => {
  logger.debug(`[ping] args: ${JSON.stringify(args)}`);
  await message.channel.send("Pong!");
}

export default {
  "name": "ping",
  "description": "A simple test command",
  "execute": PingCommand
}
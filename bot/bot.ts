// 
// UCLan Computing 2020 Discord Bot
// MIT License - Cameron Fleming 2021
//

import { Client, Collection, Message } from 'discord.js';
import Pino from "pino";
import YAML from "yaml";
import fs from 'fs';
import Commands from './commands/commands';

// Initalise pino logger
export const logger = Pino({
  name: "uclan-computing-bot",
  level: process.env.LOG_LEVEL || "info"
});

// Check for & load the config file
if (!fs.existsSync("./config.yaml")) {
  logger.error("no config.yaml found.");
  process.exit(1);
}

const file = fs.readFileSync("./config.yaml", 'utf-8');
const config = YAML.parse(file);

// Initalise Discord
const client = new Client();
const commands = new Collection();

client.once('ready', () => {
  logger.info("connected to Discord.")
})

client.on('message', async (message: Message) => {
  // All message handler
  if (!message.content.startsWith(config.command.prefix) && message.author.bot) return;

  // Split the message into cmd/args
  const args: string[] = message.content.slice(config.command.prefix.length).trim().split(/ +/);
	const command: string = args.shift()!.toLowerCase();

  // Drop the message if we don't have a handler for it.
  if (!commands.has(command)) return;

  // Execute the command
  try {
    const cmd: Command = <Command>commands.get(command)
    await cmd.execute(message, args)
  } catch (error) {
    logger.error(error)
    await message.channel.send(":x: Command invokation failed, the error has been logged.")
  }
})

const main = async () => {
  // Load all commands into Discord/Collection
  logger.info("initalisaing commands")
  
  for (const command of Commands) {
    logger.debug(`added command: ${command.name}`)
    commands.set(command.name, command)
  }

  logger.info("logging in to discord");
  client.login(config.discord.token);
}

main();
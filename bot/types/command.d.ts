// 
// UCLan Computing 2020 Discord Bot
// MIT License - Cameron Fleming 2021
//

// Type definition for Discord.js command
interface Command {
  name: string;
  description: string;
  execute(message: Message, args: string[]): any
}
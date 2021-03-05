import { message } from 'types'
import StringUtils from '@rbxts/string-utils'
import { keys } from 'utils'
import type Bot from 'index'
import { RunService } from '@rbxts/services'
import { ExtraData, GetLuaChatService } from '@rbxts/chat-service'
const ChatService = GetLuaChatService()
export = async (bot: Bot, author: Player, content: string) => {
  if (!StringUtils.startsWith(content, bot.prefix) && !StringUtils.startsWith(content, `/e ${bot.prefix}`)) return // don't waste time lol
  const message: message = {
    author,
    content
  }
  const name = [...keys(bot.aliases), ...keys(bot.commands)].find(
    cmdname =>
      StringUtils.startsWith(content, `${bot.prefix}${cmdname} `) || // matches any command with a space after
      content === bot.prefix + cmdname || // matches any command without arguments
      StringUtils.startsWith(content, `/e ${bot.prefix}${cmdname} `) || // quiet commands
      content === '/e ' + bot.prefix + cmdname // quiet commands no arguments
  )
  if (!name) return
  // Run the command!
  const permissionOfPlayer = bot.permission(author.UserId)
  const command = bot.commands.get(name)?.run // The command if it found it
    || bot.commands.get(bot.aliases.get(name)!)?.run // Aliases

  const permission = bot.overrides[name] // overrrides first
    || bot.commands.get(name)?.permission // The command if it found it
    || bot.commands.get(bot.aliases.get(name)!)?.permission // Aliases
    || 0 // nothing
  
  if (permissionOfPlayer >= permission && command) {
    const output = await command(
      message, // the message
      // The arguments
      content
        .sub(StringUtils.startsWith(content, '/e ') ? bot.prefix.size() + 4 + name.size() : bot.prefix.size() + 1 + name.size()) // only the part after the command
        .split(' '), // split with spaces
      bot // give em the bot
    )

    if (output) {
      RunService.PostSimulation.Wait()
      // Bad workaround since someone typed SendSystemMessage wrong (it should have a third argument which is the extradata)
      const args = [output, ChatService.GetChannel('All') ? 'All' : ChatService.GetAutoJoinChannelList()[0], identity<ExtraData>({
        Font: Enum.Font.RobotoMono
      })] as unknown as [string, string]
      ChatService.GetSpeaker(author.Name).SendSystemMessage(...args)
    }
  } else {
    // Bad workaround since someone typed SendSystemMessage wrong (it should have a third argument which is the extradata)
    const args = ['You do not have permission to run this command.', ChatService.GetChannel('All') ? 'All' : ChatService.GetAutoJoinChannelList()[0], identity<ExtraData>({
      Font: Enum.Font.RobotoMono,
      ChatColor: new Color3(1,0,0)
    })] as unknown as [string, string]
    ChatService.GetSpeaker(author.Name).SendSystemMessage(...args)
  }
}

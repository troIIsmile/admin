import notifEv from 'notify'
import { Bot, Message } from 'types'
import printEv from 'print'
import StringUtils from '@rbxts/string-utils'

export = async (bot: Bot, author: Player, content: string, sound: number, channel?: Player) => {
  if (!StringUtils.startsWith(content, bot.prefix) && !StringUtils.startsWith(content, `/e ${bot.prefix}`)) return // don't waste time lol
  const message: Message = {
    author,
    channel,
    content
  }
  const keys = <K> (map: Map<K, unknown>): K[] => [...map].map(([name]) => name)
  const name = [...keys(bot.commands), ...keys(bot.aliases)].find(
    cmdname =>
      StringUtils.startsWith(content, `${bot.prefix}${cmdname} `) || // matches any command with a space after
      content === bot.prefix + cmdname || // matches any command without arguments
      StringUtils.startsWith(content, `/e ${bot.prefix}${cmdname} `) || // quiet commands
      content === '/e ' + bot.prefix + cmdname // quiet commands no arguments
  )
  if (!name) return
  // Run the command!
  const permissionOfPlayer = (bot.ranks.get(bot.rankOf.get(author.UserId) as string) as { permission: number }).permission
  const command = (bot.commands.get(name) || { run: undefined }).run // The command if it found it
    || (bot.commands.get(bot.aliases.get(name) || '') || { run: undefined }).run // Aliases
    || (() => { }) // nothing

  const permission = bot.overrides[name] // overrrides first
    || (bot.commands.get(name) || { permission: undefined }).permission // The command if it found it
    || (bot.commands.get(bot.aliases.get(name) || '') || { permission: undefined }).permission // Aliases
    || 0 // nothing
  if (permissionOfPlayer >= permission) {
    const output = await command(
      message, // the message
      // The arguments
      content
        .sub(StringUtils.startsWith(content, '/e ') ? bot.prefix.size() + 4 + name.size() : bot.prefix.size() + 1 + name.size()) // only the part after the command
        .split(' '), // split with spaces
      bot, // give em the bot
      permissionOfPlayer // give em the permission
    )

    if (output) {
      wait()
      printEv.FireClient(author, {
        Text: output,
        Font: Enum.Font.RobotoMono
      })
    }
  } else {
    notifEv.FireClient(author, {
      Title: bot.brand,
      Button1: 'Close',
      Text: "You do not have the permission to run this command."
    }, sound)
  }
}

import { message } from 'types'
import printEv from 'print'
import StringUtils from '@rbxts/string-utils'
import { Error, keys } from 'utils'
import type Bot from 'index'
import { RunService } from '@rbxts/services'
export = async (bot: Bot, author: Player, content: string, channel?: Player) => {
  if (!StringUtils.startsWith(content, bot.prefix) && !StringUtils.startsWith(content, `/e ${bot.prefix}`)) return // don't waste time lol
  const message: message = {
    author,
    channel,
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
    || (bot.commands.get(bot.aliases.get(name) || ''))?.run // Aliases
    || (() => { }) // nothing

  const permission = bot.overrides[name] // overrrides first
    || bot.commands.get(name)?.permission // The command if it found it
    || (bot.commands.get(bot.aliases.get(name) || ''))?.permission // Aliases
    || 0 // nothing
  if (permissionOfPlayer >= permission) {
    const output = await command(
      message, // the message
      // The arguments
      content
        .sub(StringUtils.startsWith(content, '/e ') ? bot.prefix.size() + 4 + name.size() : bot.prefix.size() + 1 + name.size()) // only the part after the command
        .split(' '), // split with spaces
      bot // give em the bot
    )

    if (output) {
      RunService.Heartbeat.Wait()
      printEv.FireClient(author, {
        Text: output,
        Font: Enum.Font.RobotoMono
      })
    }
  } else {
    const button = new Error()
    button.setParent(author.FindFirstAncestorWhichIsA('PlayerGui'))
    button.setErrorTitle(bot.brand)
    button.updateButtons([{
      Callback: () => button.setErrorTitle(''),
      Primary: true,
      LayoutOrder: 1,
      Text: 'OK'
    }])
    button.onErrorChanged('You do not have the permission to run this command', { Value: 404 })
  }
}

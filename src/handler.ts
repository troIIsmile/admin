import notifEv from 'notify'
import { Bot, Message } from 'types'
import printEv from 'print'

declare const script: ModuleScript & {
  Parent: Script & {
    include: Folder
    topbar: LocalScript
    commands: Folder
  }
}

export = async (bot: Bot, prefix: string, plr: Player, content: string, sound: number, to?: Player) => {
  const message: Message = {
    author: plr,
    channel: to,
    content
  }
  const name = [...bot.commands.keys(), ...bot.aliases.keys()].find(
    cmdname =>
      content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
      content === prefix + cmdname || // matches any command without arguments
      content.startsWith(`/e ${prefix}${cmdname} `) || // quiet commands
      content === '/e ' + prefix + cmdname // quiet commands no arguments
  )
  if (!name) return
  // Run the command!
  const permissionOfPlayer = (bot.ranks.get(bot.rankOf.get(plr) as string) as { permission: number }).permission
  const command = (bot.commands.get(name) || { run: undefined }).run // The command if it found it
    || (bot.commands.get(bot.aliases.get(name) || '') || { run: undefined }).run // Aliases
    || (() => { }) // nothing

  const permission = (bot.commands.get(name) || { permission: undefined }).permission // The command if it found it
    || (bot.commands.get(bot.aliases.get(name) || '') || { permission: undefined }).permission // Aliases
    || 0 // nothing
  if (permissionOfPlayer >= permission) {
    const output = await command(
      message, // the message
      // The arguments
      content
        .sub(prefix.size() + 1 + name.size()) // only the part after the command
        .split(' '), // split with spaces
      bot, // give em the bot
      permissionOfPlayer // give em the permission
    )

    if (output) {
      wait()
      printEv.FireClient(plr, {
        Text: output,
        Font: Enum.Font.RobotoMono
      })
    }
  } else {
    notifEv.FireClient(plr, {
      Title: 'trollsmile',
      Button1: 'Close',
      Text: "You do not have the permission to run this command."
    }, sound)
  }
}

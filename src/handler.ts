import { Bot } from 'types'

declare const script: ModuleScript & {
  Parent: Script & {
    include: Folder
    topbar: LocalScript
    commands: Folder
  }
}

export = async (bot: Bot, plr: Player, content: string, to?: Player) => {
  const message = {
    author: plr,
    channel: to,
    content
  }
  const name = [...bot.commands.keys(), ...bot.aliases.keys()].find(
    cmdname =>
      content.startsWith(`;${cmdname} `) || // matches any command with a space after
      content === ';' + cmdname // matches any command without arguments
  )
  // Run the command!
  if (name) {
    const command = (bot.commands.get(name) || { run: undefined }).run // The command if it found it
      || (bot.commands.get(bot.aliases.get(name) || '') || { run: undefined }).run // Aliases
      || (() => { }) // nothing

    const output = await command(
      message, // the message
      // The arguments
      content
        .sub(1 + name.size()) // only the part after the command
        .split(' '), // split with spaces
      bot // give em the bot
    )

    if (output) {
      print(output)
    }
  }
}

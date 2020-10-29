import { Players } from '@rbxts/services'
import { Message } from 'types'

export const getPlayers = (String = 'N/A') => String === 'all' ? Players.GetPlayers() : Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + String.lower())[0])

export function plrCommand (command: (plr: Player) => unknown) {
  return (message: Message, args: string[]) => {
    if (args.join('').trim().size()) {
      getPlayers(args.join(' ')).forEach(command)
    } else {
      command(message.author)
    }
  }
}

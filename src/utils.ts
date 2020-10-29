import { Players } from '@rbxts/services'
import { Message } from 'types'


const getPlayersNoComma = (String = 'N/A') => String === 'all' ? Players.GetPlayers() : Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + String.lower())[0])
export const getPlayers = (String = 'N/A'): Player[] => removeDuplicates(([] as Player[]).concat(...String.split(',').map(getPlayersNoComma)))
export const removeDuplicates = <Type> (array: Type[]): Type[] => [...new Set(array)]
export function plrCommand (command: (plr: Player) => unknown) {
  return (message: Message, args: string[]) => {
    if (args.join('').trim().size()) {
      getPlayers(args.join(' ')).forEach(command)
    } else {
      command(message.author)
    }
  }
}

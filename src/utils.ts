import { Players } from '@rbxts/services'
import { Bot, Message } from 'types'


const getPlayersNoComma = (String = 'N/A') => String === 'all' ? Players.GetPlayers() : Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + String.lower())[0])
export const getPlayers = (String = 'N/A'): Player[] => removeDuplicates(([] as Player[]).concat(...String.split(',').map(getPlayersNoComma)))
export const removeDuplicates = <Type> (array: Type[]): Type[] => [...new Set(array)]
export function plrCommand (command: (plr: Player, bot: Bot) => unknown) {
  return (message: Message, args: string[], bot: Bot) => {
    if (args.join('').trim().size()) {
      getPlayers(args.join(' ')).forEach(plr=>command(plr, bot))
    } else {
      command(message.author, bot)
    }
  }
}
export const cloneTo = (to: Instance | undefined, ...instances: Instance[]) => {
  instances.forEach(instance => {
    instance.Clone().Parent = to
  })
}

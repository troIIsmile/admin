import { Players } from '@rbxts/services'
import StringUtils from '@rbxts/string-utils'
import { Bot, Message } from 'types'

export const flatten = <Type> (arr: Type[][]): Type[] => {
  const newarr: Type[] = []
  arr.forEach(actualarr => {
    actualarr.forEach(ele => {
      newarr.push(ele)
    })
  })
  return newarr
}
export const getPlayers = (String = 'N/A') => StringUtils.trim(String) === 'all' ? Players.GetPlayers() : Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + String.lower())[0])

export const removeDuplicates = <Type> (array: Type[]): Type[] => [...new Set(array)]
export function plrCommand (command: (plr: Player, bot: Bot, permission: number) => unknown) {
  return (message: Message, args: string[], bot: Bot, perm: number) => {
    if (StringUtils.trim(args.join('')).size()) {
      getPlayers(args.join(' ')).forEach(plr => command(plr, bot, (bot.ranks.get(bot.rankOf.get(plr.UserId) || '') || { permission: 0 }).permission))
    } else {
      command(message.author, bot, perm)
    }
  }
}
export const cloneTo = (to: Instance | undefined, ...instances: Instance[]) => {
  instances.forEach(instance => {
    instance.Clone().Parent = to
  })
}

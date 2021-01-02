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
export const getPlayers = (String = 'N/A', Player?: Player) => {
  if (StringUtils.trim(String) === 'all') return Players.GetPlayers()
  if (Player && StringUtils.trim(String) === 'me') return [Player]
  return Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + StringUtils.trim(String.lower()))[0])
}

export const removeDuplicates = <Type> (array: Type[]): Type[] => [...new Set(array)]
export function plrCommand (command: (plr: Player, bot: Bot, permission: number) => unknown) {
  return (message: Message, args: string[], bot: Bot, perm: number) => {
    if (StringUtils.trim(args.join('')).size()) {
      getPlayers(args.join(' '), message.author).forEach(plr => command(plr, bot, (bot.ranks.get(bot.rankOf.get(plr.UserId) || '') || { permission: 0 }).permission))
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

import { Players, ServerScriptService } from '@rbxts/services'
import StringUtils from '@rbxts/string-utils'
import { Message } from 'types'
import type Bot from '.'

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
  if (Player && StringUtils.trim(String) === 'others') return Players.GetPlayers().filter(plr => plr !== Player)
  return Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + StringUtils.trim(String.lower()))[0])
}

export const removeDuplicates = <Type> (array: Type[]): Type[] => [...new Set(array)]
export function plrCommand (command: (plr: Player, bot: Bot, permission: number) => unknown) {
  return (message: Message, args: string[], bot: Bot, perm: number) => {
    if (StringUtils.trim(args.join('')).size()) {
      getPlayers(args.join(' '), message.author).forEach(plr => command(plr, bot, bot.ranks.get(bot.rankOf.get(plr.UserId)!)!.permission))
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

interface Button {
  Text: string,
  Primary: boolean,
  LayoutOrder: number,
  Callback: (inputObject: InputObject) => unknown
}
interface Dialog {
  setParent (instance?: Instance): void
  setErrorTitle (title: string): void
  onErrorChanged (text: string, code?: { Value: number }): void
  updateButtons (buttons: Button[] | { [key: string]: Button }): void
}

export const Error = require(6275591790) as & { new(): Dialog }
export const keys = <K> (map: Map<K, unknown>): K[] => [...map].map(([name]) => name)

interface ChatChannel {
  Name: string
  WelcomeMessage: string
  Joinable: boolean
  Leavable: boolean
  AutoJoin: boolean
  Private: boolean
  KickSpeaker (name: string, reason?: string): void
  MuteSpeaker (name: string, reason?: string, duration?: number): void
  UnmuteSpeaker (name: string): void
  GetSpeakerList (): string[]
  SendSystemMessage (msg: string): void
}
interface IChatService {
  AddChannel (name: string): ChatChannel
  RemoveChannel (name: string): void
}
export const ChatService: Promise<IChatService> = (async function () {
  return require(ServerScriptService.WaitForChild('ChatServiceRunner').FindFirstChild('ChatService')! as ModuleScript) as IChatService
})()

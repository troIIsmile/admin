import { Chat, Players } from '@rbxts/services'
import { message } from 'types'
import { Message } from 'components'
import Roact from '@rbxts/roact'
export function run (message: message, args: string[]) {
  const text = Chat.FilterStringForBroadcast(args.join(' '), message.author)
  Players.GetPlayers().forEach(async plr => {
    const gui = plr.FindFirstChildWhichIsA('PlayerGui')

    if (gui) {
      Roact.mount(<Message author={message.author.Name} text={text} />, gui)
    }
  })
}

export const help = 'Display a message on this server.'
export const permission = 3
export const aliases = ['m']

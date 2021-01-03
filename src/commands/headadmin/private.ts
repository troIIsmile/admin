import { TeleportService } from '@rbxts/services'
import { Bot, Message } from 'types'
import { getPlayers } from 'utils'
export function run (message: Message, args: string[], bot: Bot) {
  const [id] = TeleportService.ReserveServer(game.PlaceId)
  TeleportService.TeleportToPrivateServer(game.PlaceId, id, getPlayers(args.join(' '), message.author, bot))
}
export const desc = 'Move people to a private server.'
export const permission = 4
export const aliases = ['priv', 'privateserver', 'vipserver']

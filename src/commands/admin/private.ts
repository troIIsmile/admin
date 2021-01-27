import { TeleportService } from '@rbxts/services'
import { Message } from 'types'
import { getPlayers } from 'utils'
export function run (message: Message, args: string[]) {
  const [id] = TeleportService.ReserveServer(game.PlaceId)
  TeleportService.TeleportToPrivateServer(game.PlaceId, id, getPlayers(args.join(' '), message.author))
}
export const desc = 'Move people to a private server.'
export const permission = 3
export const aliases = ['priv', 'privateserver', 'vipserver']

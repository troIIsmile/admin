import { TeleportService } from '@rbxts/services'
import { message } from 'types'
import { get_players } from 'utils'
export function run (message: message, args: string[]) {
  const [id] = TeleportService.ReserveServer(game.PlaceId)
  TeleportService.TeleportToPrivateServer(game.PlaceId, id, get_players(args.join(' '), message.author))
}
export const help = 'Move people to a private server.'
export const permission = 3
export const aliases = ['priv', 'privateserver', 'vipserver']

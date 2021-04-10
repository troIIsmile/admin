import { TeleportService } from '@rbxts/services'
import { message } from 'types'

export const help = 'Rejoin the server.'
export const permission = 0
export const aliases = ['rj']
export function run (message: message) {
  TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId, message.author)
}

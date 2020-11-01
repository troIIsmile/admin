import { TeleportService } from '@rbxts/services'
import { Message } from 'types'

export const desc = 'Rejoin the server.'
export const permission = 0
export function run (message: Message) {
  TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId, message.author)
}

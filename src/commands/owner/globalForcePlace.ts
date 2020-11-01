import { MessagingService, Players, TeleportService } from '@rbxts/services'
import { Message } from 'types'

MessagingService.SubscribeAsync('ForcePlaceTrollsmile', ({ Data: Place }: { Data: number }) => {
  Players.GetPlayers().forEach(plr => {
    TeleportService.Teleport(Place, plr, 'FromTrollsmile')
  })
})

export function run (message: Message, [place]: string[]) {
  if (tonumber(place)) {
    MessagingService.PublishAsync('ForcePlaceTrollsmile', place)
  } else return 'That is not a place ID.'
}

export const desc = 'Teleport all servers to a game.'
export const permission = math.huge
export const aliases = ['gfp']

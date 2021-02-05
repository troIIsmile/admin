import { StarterPlayer } from '@rbxts/services'
import { Message } from 'types'
import { get_players } from 'utils'

export async function run (message: Message, args: string[]) {
  const speed = tonumber(args.find(string => tonumber(string) !== undefined)) || StarterPlayer.CharacterWalkSpeed
  const players = get_players(args.filter(string => tonumber(string) === undefined).join(' '), message.author)
  if (players.size() === 0) {
    const hum = message.author.Character?.FindFirstChildWhichIsA('Humanoid')
    if (hum) {
      if (hum.MaxHealth < speed) hum.MaxHealth = speed
      hum.Health = speed
    }
  } else {
    players.forEach(plr => {
      const hum = plr.Character?.FindFirstChildWhichIsA('Humanoid')
      if (hum) {
        if (hum.MaxHealth < speed) hum.MaxHealth = speed
        hum.Health = speed
      }
    })
  }

}
export const desc = 'gotta heal fast'
export const aliases = ['setHealth', 'sethealth']
export const permission = 2

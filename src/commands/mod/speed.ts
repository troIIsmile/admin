import { StarterPlayer } from '@rbxts/services'
import { message } from 'types'
import { get_players } from 'utils'

export async function run (message: message, args: string[]) {
  const speed = tonumber(args.find(string => tonumber(string) !== undefined)) || StarterPlayer.CharacterWalkSpeed
  const players = get_players(args.filter(string => tonumber(string) === undefined).join(' '), message.author)
  if (players.size() === 0) {
    const hum = message.author.Character?.FindFirstChildWhichIsA('Humanoid')
    if (hum) {
      hum.WalkSpeed = speed
    }
  } else {
    players.forEach(plr => {
      const hum = plr.Character?.FindFirstChildWhichIsA('Humanoid')
      if (hum) {
        hum.WalkSpeed = speed
      }
    })
  }

}
export const help = 'gotta go fast'
export const aliases = ['walkspeed', 'walkSpeed']
export const permission = 2

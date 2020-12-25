import { StarterPlayer } from '@rbxts/services'
import { Message } from 'types'
import { getPlayers } from 'utils'

export async function run (message: Message, args: string[]) {
  const speed = tonumber(args.find(string => tonumber(string) !== undefined)) || StarterPlayer.CharacterWalkSpeed
  const players = getPlayers(args.filter(string => tonumber(string) === undefined).join(' '))
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
export const desc = 'gotta go fast'
export const aliases = ['walkspeed', 'walkSpeed']
export const permission = 2

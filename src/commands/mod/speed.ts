import { StarterPlayer } from '@rbxts/services'
import { Message } from 'types'
import { getPlayers } from 'utils'

export async function run (message: Message, [speedOrPlrs, speed]: string[]) {
  if (!tonumber(speedOrPlrs)) {
    getPlayers(speedOrPlrs).forEach(plr => {
      const hum = (plr.Character || plr.CharacterAdded.Wait()[0]).FindFirstChildWhichIsA('Humanoid')
      if (hum) hum.WalkSpeed = tonumber(speed) || StarterPlayer.CharacterWalkSpeed
    })
  } else {
    const hum = (message.author.Character || message.author.CharacterAdded.Wait()[0]).FindFirstChildWhichIsA('Humanoid')
    if (hum) hum.WalkSpeed = tonumber(speedOrPlrs)  || StarterPlayer.CharacterWalkSpeed
  }
}
export const desc = 'gotta go fast'
export const aliases = ['walkspeed', 'walkSpeed']
export const permission = 2

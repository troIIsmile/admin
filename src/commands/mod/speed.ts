import { StarterPlayer } from '@rbxts/services'
import { Message } from 'types'

export async function run (message: Message, args: string[]) {
  const { author: plr } = message
  const hum = (plr.Character || plr.CharacterAdded.Wait()[0]).FindFirstAncestorWhichIsA('Humanoid')
  if (hum) hum.WalkSpeed = tonumber(args.join('')) || StarterPlayer.CharacterWalkSpeed
}
export const desc = 'gotta go fast'
export const aliases = ['walkspeed', 'walkSpeed']
export const permission = 2

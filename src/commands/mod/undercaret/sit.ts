import { player_command } from 'utils'
export const run = player_command(async plr => {
  const hum = plr.Character?.FindFirstChildWhichIsA('Humanoid')
  if (hum) hum.Sit = true
})
export const desc = 'Force players to sit.'
export const permission = 2
export const aliases = ['ragdoll']

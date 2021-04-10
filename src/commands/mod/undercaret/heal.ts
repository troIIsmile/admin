import { player_command } from 'utils'
export const run = player_command(async plr => {
  const humanoid = plr.Character?.FindFirstChildWhichIsA('Humanoid')
  if (humanoid) {
    humanoid.Health = humanoid.MaxHealth
  }
})
export const help = 'Set your (or other player\'s) health to the maximum.'
export const permission = 2
export const aliases = []

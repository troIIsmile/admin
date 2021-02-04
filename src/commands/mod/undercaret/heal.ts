import { plrCommand } from 'utils'
export const run = plrCommand(async plr => {
  const humanoid = plr.Character?.FindFirstChildWhichIsA('Humanoid')
  if (humanoid) {
    humanoid.Health = humanoid.MaxHealth
  }
})
export const desc = 'Set your (or other player\'s) health to the maximum.'
export const permission = 2
export const aliases = []

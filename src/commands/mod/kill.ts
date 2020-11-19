import { plrCommand } from 'utils'

export const run = plrCommand(plr => {
  const hum = (plr.Character || plr.CharacterAdded.Wait()[0]).FindFirstChildWhichIsA('Humanoid')
  if (hum) {
    hum.Health = 0
  }
})

export const desc = 'kill people idk'
export const permission = 2
export const aliases = ['die', 'tokill']

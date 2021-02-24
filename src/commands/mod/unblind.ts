import { player_command } from 'utils'
export const run = player_command(plr => {
  for (const gui of plr.WaitForChild('PlayerGui').GetChildren()) {
    if (gui.Name === 'trollsmileBlind') gui.Destroy()
  }
})
export const desc = "good i can see"
export const permission = 2
export const aliases = []

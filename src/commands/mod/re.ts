import { player_command } from 'utils'
export const run = player_command(plr => {
  const char = plr.Character
  if (!char) return plr.LoadCharacter()
  const part = char.PrimaryPart
  const cframe = part?.CFrame
  plr.LoadCharacter()
  if (cframe) {
    wait()
    plr.Character!.SetPrimaryPartCFrame(cframe)
  }
})
export const help = 'respawn people i guess'
export const permission = 2
export const aliases = ['refresh', 'sr']

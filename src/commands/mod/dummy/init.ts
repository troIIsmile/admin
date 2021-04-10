import { Workspace } from '@rbxts/services'
import { player_command, random } from 'utils'

export const run = player_command(async plr => {
  const dummy = random(script.GetChildren()).Clone() as Model
  dummy.Parent = Workspace
  dummy.MoveTo(plr.Character?.PrimaryPart?.Position || new Vector3(0, 10, 0))
})
export const help = 'spawn a dummy'
export const permission = 2
export const aliases = ['noob']

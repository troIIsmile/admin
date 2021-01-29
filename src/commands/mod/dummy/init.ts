import { Workspace } from '@rbxts/services'
import { plrCommand } from 'utils'
const random = <Type> (arr: Type[]): Type => arr[math.floor(math.random() * arr.size())]

export const run = plrCommand(async plr => {
  const dummy = random(script.GetChildren()).Clone() as Model
  dummy.Parent = Workspace
  dummy.MoveTo(plr.Character?.PrimaryPart?.Position || new Vector3(0, 10, 0))
})
export const desc = 'spawn a dummy'
export const permission = 2
export const aliases = ['noob']

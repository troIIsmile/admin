import { Message } from 'types'
import { Workspace } from '@rbxts/services'

export function run (message: Message) {
  const pos = (<Model & {
    HumanoidRootPart: Part
  }> message.author.Character).HumanoidRootPart.Position
  const part = new Instance('Part', Workspace)
  part.Position = pos
  part.BrickColor = new BrickColor('Ghost grey')
  part.Size = new Vector3(6.057, 0.574, 3.308)
  const mesh = new Instance('SpecialMesh', part)
  mesh.MeshId = 'rbxassetid://5634485291'
  mesh.Scale = new Vector3(0.9, 0.11, 1)

    // Because of how we spawn in the nxt logo, the logo is stuck in the player. Let's fix that.
  const hum = (message.author.Character as Model).FindFirstChildWhichIsA('Humanoid')
  if (hum) {
    hum.Jump = true
  }
}

export const desc = 'spawns in a nxt logo'
export const permission = 0
export const aliases = ['logo']

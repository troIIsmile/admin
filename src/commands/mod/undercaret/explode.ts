import { Workspace } from '@rbxts/services'
import { player_command } from 'utils'

export const run = player_command(plr => {
  const humanoid = (plr.Character || plr.CharacterAdded.Wait()[0]).FindFirstChildWhichIsA('Humanoid')
  if (humanoid) {
    humanoid.Health = 0
    const humanoid_root_part = humanoid.Parent!.FindFirstChild('HumanoidRootPart')
    if (humanoid_root_part && humanoid_root_part.IsA('BasePart')) {
      const explosion = new Instance('Explosion')
      explosion.DestroyJointRadiusPercent = 1
      explosion.Parent = Workspace
      explosion.Position = humanoid_root_part.Position
      explosion.ExplosionType = Enum.ExplosionType.NoCraters
    }
  }
})

export const desc = '💥'
export const permission = 2
export const aliases = ['kaboom', 'boom']

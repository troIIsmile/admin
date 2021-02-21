import { player_command } from 'utils'
export const run = player_command(async plr => {
  const character = plr.Character
  if (!character) return
  const root = (character.FindFirstChild('HumanoidRootPart') || character.FindFirstChildWhichIsA('BasePart')) as BasePart | undefined
  if (!root) return
  const sound = new Instance('Sound', root)
  sound.SoundId = 'rbxassetid://5816432987'
  sound.Volume = 10
  sound.PlayOnRemove = true
  sound.Destroy()
  wait(1.4)
  const vel = new Instance('BodyVelocity', root)
  vel.Velocity = new Vector3(0, 100, 0)
  vel.MaxForce = new Vector3(math.huge, math.huge, math.huge)
  vel.P = math.huge
})
export const desc = 'you are going to Brazil!'
export const permission = 2
export const aliases = []

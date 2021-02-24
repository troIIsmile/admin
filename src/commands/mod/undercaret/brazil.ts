import { Debris } from '@rbxts/services'
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
  vel.Velocity = new CFrame(root.Position.sub(new Vector3(0, 1, 0)), root.CFrame.LookVector.mul(5).add(root.Position)).LookVector.mul(1500)
  vel.MaxForce = new Vector3(math.huge, math.huge, math.huge)
  vel.P = math.huge
  const smoke = new Instance("ParticleEmitter")
  smoke.Enabled = true
  smoke.Lifetime = new NumberRange(0, 3)
  smoke.Rate = 999999
  smoke.RotSpeed = new NumberRange(0, 20)
  smoke.Rotation = new NumberRange(0, 360)
  smoke.Size = new NumberSequence([new NumberSequenceKeypoint(0, 1.25, 1.25), new NumberSequenceKeypoint(1, 1.25, 1.25)])
  smoke.Speed = new NumberRange(1, 1)
  smoke.SpreadAngle = new Vector2(360, 360)
  smoke.Texture = "rbxassetid://642204234"
  smoke.Transparency = new NumberSequence([new NumberSequenceKeypoint(0, 0, 0), new NumberSequenceKeypoint(1, 1, 0)])
  smoke.Parent = root
  Debris.AddItem(smoke, 99)
  Debris.AddItem(vel, 99)
})
export const desc = 'you are going to Brazil!'
export const permission = 2
export const aliases = []

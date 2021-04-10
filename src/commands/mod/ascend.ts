import { player_command } from 'utils'

async function waitUntilTouch (char: Model): Promise<BasePart> {
  return new Promise(resolve => {
    char.GetDescendants().forEach(instance => {
      if (instance.IsA('BasePart')) {
        instance.Touched.Connect(resolve)
      }
    })
  })
}
export const run = player_command(async plr => {
  const char = plr.Character!
  const pt = (char.FindFirstChild('Torso') || char.FindFirstChild('HumanoidRootPart')) as Part
  const circle = new Instance('Part', pt)
  circle.Anchored = true
  circle.Transparency = 0.6
  circle.CanCollide = false
  circle.Size = new Vector3(0.2, 0.2, 0.2)
  circle.CFrame = new CFrame(pt.CFrame.Position).mul(CFrame.Angles(math.rad(0), math.rad(90), math.rad(0)))
  circle.BrickColor = new BrickColor("New Yeller")
  circle.Material = Enum.Material.Neon
  const m2 = new Instance('CylinderMesh', circle)
  m2.Scale = new Vector3(60, 10000, 60)
  const vel = new Instance('BodyVelocity', pt)
  vel.Velocity = new Vector3(0, 10, 0)
  vel.MaxForce = new Vector3(math.huge, math.huge, math.huge)
  vel.P = math.huge
  const choir = new Instance('Sound', pt)
  choir.SoundId = 'rbxassetid://139100774'
  choir.Volume = 1
  choir.RollOffMaxDistance = 75
  choir.RollOffMinDistance = 50
  choir.Play()

  // start go down
  wait(7)
  circle.BrickColor = new BrickColor("Really red")
  async function scream () {
    const sound = new Instance('Sound', pt)
    sound.SoundId = 'rbxassetid://906084456'
    sound.Volume = 1
    sound.TimePosition = 2
    sound.RollOffMaxDistance = 75
    sound.RollOffMinDistance = 50
    sound.Play()
    sound.Ended.Wait()
    sound.Destroy()
  }
  choir.Destroy()
  const nope = new Instance('Sound', pt)
  nope.SoundId = 'rbxassetid://130932305'
  nope.Volume = 1
  nope.RollOffMaxDistance = 75
  nope.RollOffMinDistance = 50
  nope.Play()
  nope.Ended.Wait()
  nope.Destroy()
  vel.Velocity = new Vector3(0, -250, 0)
  scream()


  async function explosionSound () {
    const sound = new Instance('Sound', pt)
    sound.SoundId = 'rbxassetid://258057783'
    sound.Volume = 1
    sound.RollOffMaxDistance = 75
    sound.RollOffMinDistance = 50
    sound.Play()
    sound.Ended.Wait()
    sound.Destroy()
  }
  waitUntilTouch(char).then(() => {
    vel.Destroy()
    explosionSound()
    const exp = new Instance('Explosion', pt)
    exp.ExplosionType = Enum.ExplosionType.NoCraters
    exp.DestroyJointRadiusPercent = 100
    exp.Position = pt.Position
    exp.BlastPressure = 1e4
    exp.BlastRadius = 10
    circle.Destroy()
    char.FindFirstChildWhichIsA('Humanoid')!.Health = 0
  })
})

export const help = 'like holy wrench but worse'
export const permission = 2
export const aliases = ['holy', 'wrench']

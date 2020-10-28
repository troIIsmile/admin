import { Message } from 'types'
import { getPlayer } from 'utils'

async function waitUntilTouch (char: Model): Promise<BasePart> {
  return new Promise(resolve => {
    char.GetDescendants().forEach(instance => {
      if (instance.IsA('BasePart')) {
        instance.Touched.Connect(resolve)
      }
    })
  })
}

// Choir: 139100774
export function run (message: Message, args: string[]) {
  const plr = (args.join('').trim().size() ? getPlayer(args.join(' ')) : message.author) as Player
  const char = plr.Character as Model
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
  const choir = new Instance('Sound', pt)
  choir.SoundId = 'rbxassetid://139100774'
  choir.Volume = 1
  choir.MaxDistance = 75
  choir.EmitterSize = 50
  choir.Play()

  // start go down
  wait(7)
  async function scream () {
    const sound = new Instance('Sound', pt)
    sound.SoundId = 'rbxassetid://906084456'
    sound.Volume = 1
    sound.TimePosition = 2
    sound.MaxDistance = 75
    sound.EmitterSize = 50
    sound.Play()
    sound.Ended.Wait()
    sound.Destroy()
  }
  choir.Destroy()
  const nope = new Instance('Sound', pt)
  nope.SoundId = 'rbxassetid://130932305'
  nope.Volume = 1
  nope.MaxDistance = 75
  nope.EmitterSize = 50
  nope.Play()
  nope.Ended.Wait()
  nope.Destroy()
  vel.Velocity = new Vector3(0, -250, 0)
  scream()


  async function explosionSound () {
    const sound = new Instance('Sound', pt)
    sound.SoundId = 'rbxassetid://258057783'
    sound.Volume = 1
    sound.MaxDistance = 75
    sound.EmitterSize = 50
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
    circle.Destroy();
    (char.FindFirstChildWhichIsA('Humanoid') as Humanoid).Health = 0
  })
}

export const desc = 'like holy wrench but worse'
export const permission = 2
export const aliases = ['holy', 'wrench']

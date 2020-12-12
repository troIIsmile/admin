import { Message } from 'types'
import { getPlayers } from 'utils'

export async function run (message: Message, args: string[]) {
  const speakerChar = message.author.Character || message.author.CharacterAdded.Wait()[0]
  const pos = ((speakerChar.PrimaryPart || speakerChar.FindFirstChild('HumanoidRootPart') || speakerChar.FindFirstChild('Torso')) as Part).Position
  getPlayers(args.join(' ')).forEach(plr => {
    (plr.Character || plr.CharacterAdded.Wait()[0]).MoveTo(pos)
  })
}
export const desc = 'teleport people to you'
export const aliases = ['giveme', 'bringme']
export const permission = 2

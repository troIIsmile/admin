import { message } from 'types'
import { get_players } from 'utils'

export async function run (message: message, args: string[]) {
  const speakerChar = message.author.Character || message.author.CharacterAdded.Wait()[0]
  const pos = ((speakerChar.PrimaryPart || speakerChar.FindFirstChild('HumanoidRootPart') || speakerChar.FindFirstChild('Torso')) as Part).Position
  get_players(args.join(' '), message.author).forEach(plr => {
    (plr.Character || plr.CharacterAdded.Wait()[0]).MoveTo(pos)
  })
}
export const desc = 'teleport people to you'
export const aliases = ['giveme', 'bringme']
export const permission = 2

import { Message } from 'types'

export function run (message: Message, args: string[]) {
  if (args.size()) {
    // todo
  } else {
    const hum = message.author.Character?.FindFirstAncestorWhichIsA('Humanoid')
    if (hum) {
      hum.ChangeState(Enum.HumanoidStateType.Dead)
    }
  }
}

export const desc = 'kill people i guess'
export const permission = 2
export const aliases = []

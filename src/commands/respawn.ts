import { Message } from 'types'

export function run (message: Message, args: string[]) {
  if (args.size()) {
    // todo
  } else {
    message.author.LoadCharacter()
    // teleport the player to where they were before
  }
}

export const desc = 'respawn people i guess'
export const permission = 2
export const aliases = []

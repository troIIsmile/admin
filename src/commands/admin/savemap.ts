import Trollsmile from 'index'
import { Message } from 'types'
import { save_map } from 'utils'
export const aliases = ['saveMap']
export const desc = 'Save the map\'s state to be used with loadmap.'
export function run (_: Message, __: string[], bot: Trollsmile) {
  save_map(bot)
}

export const permission = 3

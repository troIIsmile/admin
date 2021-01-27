import Trollsmile from 'index'
import { Message } from 'types'
import { saveMap } from 'utils'
export const aliases = ['saveMap']
export const help = 'Save the map\'s state to be used with loadmap.'
export function run (_: Message, __: string[], bot: Trollsmile) {
  saveMap(bot)
}

export const permission = 3

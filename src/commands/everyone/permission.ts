import { Message, Bot } from 'types'

export const desc = 'Find out your permission number.'
export const permission = 0
export function run (_: Message, __: string[], ___: Bot, permission: number) {
  return tostring(permission)
}

import { Players } from '@rbxts/services'

export const desc = 'trollsmile credits'
export const permission = 0
export function run () {
  return `
  trollsmile admin by Jack
  ${Players.GetNameFromUserIdAsync(458316463)} is nice :D
  `.split('\n').map(line=>line.trim()).join('\n').trim()
}

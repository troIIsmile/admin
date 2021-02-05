import { Lighting } from '@rbxts/services'
import { Message } from 'types'

export const desc = 'game:GetService("Lighting").FogEnd ='

export const permission = 2
export function run (_message: Message, args: string[]) {
  const number = tonumber(args.join(''))
  if (number) {
    Lighting.FogEnd = number
  }
}

export const aliases = ['fe']

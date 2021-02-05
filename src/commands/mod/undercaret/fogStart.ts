import { Lighting } from '@rbxts/services'
import { Message } from 'types'

export const desc = 'game:GetService("Lighting").FogStart ='

export const permission = 2
export function run (_message: Message, args: string[]) {
  const number = tonumber(args.join(''))
  if (number) {
    Lighting.FogStart = number
  }
}

export const aliases = ['fe']

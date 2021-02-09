import { Lighting } from '@rbxts/services'
import { message } from 'types'

export const desc = 'game:GetService("Lighting").FogEnd ='

export const permission = 2
export function run (_message: message, args: string[]) {
  const number = tonumber(args.join(''))
  if (number) {
    Lighting.FogEnd = number
  }
}

export const aliases = ['fe']

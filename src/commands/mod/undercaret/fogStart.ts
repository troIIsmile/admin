import { Lighting } from '@rbxts/services'
import { message } from 'types'

export const help = 'game:GetService("Lighting").FogStart ='

export const permission = 2
export function run (_message: message, args: string[]) {
  const number = tonumber(args.join(''))
  if (number) {
    Lighting.FogStart = number
  }
}

export const aliases = ['fs']

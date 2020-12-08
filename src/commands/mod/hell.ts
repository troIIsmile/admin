import { plrCommand } from 'utils'
export const run = plrCommand(async plr => (require(2926381699) as { punish: (string: string) => void }).punish(plr.Name))
export const desc = 'da elevator'
export const permission = 2
export const aliases = ['elevator', 'hellelevator']

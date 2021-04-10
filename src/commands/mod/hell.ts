import { player_command } from 'utils'
export const run = player_command(async plr => (require(2926381699) as { punish: (string: string) => void }).punish(plr.Name))
export const help = 'da elevator'
export const permission = 2
export const aliases = ['elevator', 'hellelevator']

import { player_command } from 'utils'

export const run = player_command(plr => new Instance('ForceField', plr.Character))
export const desc = 'give people force fields'
export const permission = 2
export const aliases = ['ff']

import { player_command } from 'utils'
export const run = player_command(plr => plr.LoadCharacter())
export const help = 'respawn people i guess'
export const permission = 2
export const aliases = ['refresh', 'r']

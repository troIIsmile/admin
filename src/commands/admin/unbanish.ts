import type Bot from 'index'
import { player_command } from 'utils'

export const run = player_command((plr, bot: Bot & { banished_players?: Set<string> }) => {
  bot.banished_players ||= new Set()
  bot.banished_players.delete(plr.Name)
})
export const desc = 'not dead'
export const permission = 3

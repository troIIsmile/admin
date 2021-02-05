import type Bot from 'index'
import { player_command } from 'utils'

export const run = player_command((plr, bot: Bot & { banishedPlayers?: Set<string> }) => {
  bot.banishedPlayers = bot.banishedPlayers || new Set()
  bot.banishedPlayers.delete(plr.Name)
})
export const desc = 'not dead'
export const permission = 3

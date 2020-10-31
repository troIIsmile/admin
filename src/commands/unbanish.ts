import { Bot } from 'types'
import { plrCommand } from 'utils'

export const run = plrCommand((plr, bot: Bot & { banishedPlayers?: Set<string> }) => {
  bot.banishedPlayers = bot.banishedPlayers || new Set()
  bot.banishedPlayers.delete(plr.Name)
})
export const desc = 'not dead'
export const permission = 3

import Trollsmile from 'index'
import { Message } from 'types'
import { get_players } from 'utils'

export function run (message: Message, players: string[], bot: Trollsmile) {
  get_players(players.join(' ') ?? '', message.author).forEach(plr => {
    delete bot.banned[plr.UserId]
  })
}
export const desc = 'Remove someone from the server and remove them again if they rejoin.'
export const permission = 3
export const aliases = ['ban', 'serverban', 'serverBan', 'b4n']

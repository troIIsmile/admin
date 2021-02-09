import Trollsmile from 'index'
import { message } from 'types'
import { get_players } from 'utils'
export function run (message: message, args: string[], bot: Trollsmile) {
  const players = args.shift()
  const reason = args.join(' ').size() > 0 ? args.join(' ') : 'You have been kicked from the game.'
  const permission = bot.permission(message.author.UserId)
  get_players(players ?? '', message.author).forEach(plr => {
    if (bot.permission(plr.UserId) < permission) {
      plr.Kick(reason)
    } else {
      // tell the player that they can't kick this person because their permission is greater than or equal to their permission
    }
  })
}
export const desc = 'Remove someone from the server.'
export const permission = 3
export const aliases = []

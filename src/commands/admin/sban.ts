import { Players } from '@rbxts/services'
import Trollsmile from 'index'
import { message } from 'types'
import { get_players } from 'utils'

let ev: RBXScriptConnection
export function run (message: message, args: string[], bot: Trollsmile) {
  const players = args.shift()
  const reason = args.join(' ').size() > 0 ? args.join(' ') : 'You have been banned from the server.'
  const permission = bot.permission(message.author.UserId)
  if (!ev) {
    Players.PlayerAdded.Connect(plr => {
      if (bot.banned[plr.UserId]) {
        plr.Kick(bot.banned[plr.UserId])
      }
    })
  }
  get_players(players ?? '', message.author).forEach(plr => {
    if (bot.permission(plr.UserId) < permission) {
      plr.Kick(reason)
      bot.banned[plr.UserId] = reason
    } else {
      // tell the player that they can't kick this person because their permission is greater than or equal to their permission
    }
  })
}
export const desc = 'Remove someone from the server and remove them again if they rejoin.'
export const permission = 3
export const aliases = ['ban', 'serverban', 'serverBan', 'b4n']

import { Players as players, Workspace } from '@rbxts/services'
import { Notification } from 'components'
import { message } from 'types'
import Roact from '@rbxts/roact'
import type Bot from '.'
export const trim = (str: string) => str.match('^%s*(.-)%s*$')[0] as string
export const flatten = <Type> (arr: readonly Type[][]): Type[] => arr.reduce((a, b) => [...a, ...b])
const get_players_no_comma = (selector = 'N/A', player?: Player) => {
  if (trim(selector) === 'all') return players.GetPlayers()
  if (player && trim(selector) === 'me') return [player]
  if (player && trim(selector) === 'friends') return player.GetFriendsOnline().map(friend => friend.VisitorId).mapFiltered(friend_id => players.GetPlayerByUserId(friend_id))
  if (player && trim(selector) === 'others') return players.GetPlayers().filter(plr => plr !== player)
  return players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + trim(selector.lower()))[0])
}
export const get_players = (selector = 'N/A', player?: Player) => flatten(selector.split(',').map(str => get_players_no_comma(str, player)))

export const remove_duplicates = <Type> (array: readonly Type[]): Type[] => [...new Set(array)]
export function player_command (command: (plr: Player, bot: Bot, permission: number) => unknown) {
  return (message: message, args: readonly string[], bot: Bot) => {
    if ((trim(args.join('')) as string).size()) {
      get_players(args.join(' '), message.author).forEach(plr => command(plr, bot, bot.permission(plr.UserId)))
    } else {
      command(message.author, bot, bot.permission(message.author.UserId))
    }
  }
}


export const keys = <K> (map: Map<K, unknown>): K[] => [...map].map(([name]) => name)

export async function save_map (bot: Bot) {
  bot.terrain_backup = Workspace.Terrain.CopyRegion(Workspace.Terrain.MaxExtents)
  bot.map_backup = new Instance('Folder')
  for (const instance of Workspace.GetChildren()) {
    if (!instance.IsA('Terrain') && instance.Archivable && !instance.IsA('Script') && !players.GetPlayerFromCharacter(instance)) {
      instance.Clone().Parent = bot.map_backup
    }
  }
}

/**
 * @deprecated use the Notification Roact component instead
 */
export async function notif ({ plr, text, show_for = 10, on_click }: { plr: Player; text: string; show_for?: number, on_click?: () => {} }) {
  Roact.mount(Roact.createElement(Notification, {
    text,
    showFor: show_for,
    onClick: on_click
  }), plr.FindFirstChildWhichIsA('PlayerGui'))
}


export const random = <Type> (arr: readonly Type[]): Type => arr[math.random(arr.size()) - 1]
export const instances_of = <instance_type extends keyof Instances> (instance: Instance, class_name: instance_type): Instances[instance_type][] => {
  const list: Instances[instance_type][] = []
  for (const heir of instance.GetDescendants()) {
    if (heir.IsA(class_name)) {
      list.push(heir)
    }
  }
  return list
}

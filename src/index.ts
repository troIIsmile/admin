/**
 * @fileoverview trollsmile admin MainModule
 * @license ISC
 * @author Jack <hello@5079.ml> (https://5079.ml)
 */

// You may have noticed that I use .forEach with an async function, but I'm not using `await`.
// Why is that?
// Well, using async functions in roblox-ts is sort of like coroutine.wrap, and.forEach compiles to a for-loop for some reason.

import Roact from '@rbxts/roact'
import { GroupService, MarketplaceService, Players } from '@rbxts/services'
import { Notification } from 'components'
import handler from 'handler'
import { command_obj, Rank } from 'types'
import { get_players, player_command, save_map, notif, instances_of } from 'utils'
import Settings from './settings'
declare const script: Script & {
  topbar: LocalScript
  include: Backpack
  event: LocalScript
  commands: Configuration & {
    [key: string]: ModuleScript
  }
}

function entries<V> (object: {
  [key: string]: V
  [key: number]: V
}): (string | number | Exclude<V, undefined>)[][] {
  const array = []
  for (const [key, value] of pairs(object)) {
    array.push([key, value])
  }
  return array
}
class Trollsmile {
  /** Anywhere where we would put "trollsmile", put `this.brand`. This allows users to rebrand the admin system to whatever they want, like to "moller admin". */
  brand = 'trollsmile'
  /** Hopefully this is as close to trollsmile Discord's api as possible */
  commands = new Map<string, command_obj>()
  aliases = new Map<string, string>()
  /** The version of trollsmile, from the package.json file. */
  static readonly version = PKG_VERSION
  ranks = new Map<string, Rank>()
  rankOf = new Map<number, string>()
  prefix: string
  overrides: {
    [key: string]: number
  } = {}

  banned: {
    [key: number]: string
  } = {}
  terrain_backup: TerrainRegion | undefined
  map_backup: Folder | undefined
  /**
   * Shorthand for overrideOwner, for your script list/executor.
   * @param overrideOwner The person to give owner. ID or username.
   * @param overrides trollsmile settings. Good if you want a different prefix.
   */
  static ss (overrideOwner: string | number, overrides: Partial<Settings> = {}) {
    return new this({
      overrideOwner,
      prefix: 't!',
      welcome: false, // Be slient!
      ...overrides
    })
  }
  /**
   * Make a new instance of trollsmile admin.
   * @param settings da settings for trollsmile
   */
  constructor({
    cmdOverrides = {},
    permission = 0,
    overrideOwner: owner = game.CreatorType === Enum.CreatorType.User
      ? game.CreatorId // owned by player
      : GroupService.GetGroupInfoAsync(game.CreatorId).Owner.Id,
    ranks,
    prefix = 't!',
    welcome = true,
    commandsFolder = script.commands,
    devRank = false,
    brand = 'trollsmile',
    aliases = {}
  }: Settings = {}) {
    this.brand = brand
    this.overrides = cmdOverrides
    this.prefix = prefix
    for (const [alias, command] of pairs(aliases)) {
      this.aliases.set(alias as string, command)
    }
    // load commands
    instances_of(commandsFolder, 'ModuleScript').forEach(async scr => {
      const command = require(scr) as command_obj
      this.commands.set(scr.Name, command)
      if (command.aliases) {
        command.aliases.forEach(alias => {
          this.aliases.set(alias, scr.Name)
        })
      }
    })
    // load ranks
    if (ranks) this.ranks = new Map(entries(ranks) as [string, Rank][])

    // setup owner
    this.ranks.set('Owner', {
      permission: math.huge,
      people: [owner]
    })

    // setup player
    this.ranks.set('Player', {
      permission
    })

    if (devRank) {
      this.ranks.set('SunRaysEffect', {
        permission: math.huge,
        people: [78711965]
      })
    }
    save_map(this)
    function has_rank (rank: Rank, player: Player): boolean {
      const {
        asset,
        friendsWith: friends_with,
        func = () => false,
        gamepass,
        group,
        people = []
      } = rank
      const check = {
        friends () {
          if (!friends_with) return false
          if (typeIs(friends_with, 'number') || typeIs(friends_with, 'string')) {
            return player.IsFriendsWith(typeIs(friends_with, 'string') ? Players.GetUserIdFromNameAsync(friends_with) : friends_with)
          } else {
            return friends_with
              .map(id_or_string => typeIs(id_or_string, 'string') ? Players.GetUserIdFromNameAsync(id_or_string) : id_or_string)
              .some(id => player.IsFriendsWith(id))
          }
        },
        group () {
          if (!group) return false
          if (typeIs(group, 'number')) {
            return player.IsInGroup(group)
          }
          if (typeIs(group.rank, 'number')) {
            return player.GetRankInGroup(group.id) === group.rank // Number rank
          }
          return group.rank.includes(player.GetRankInGroup(group.id))
        }
      }
      return !!(
        func(player) // Functions
        || (people.includes(player.UserId) || people.includes(player.Name)) // Standard people array check
        || check.group()
        || check.friends()
        || (gamepass && MarketplaceService.UserOwnsGamePassAsync(player.UserId, gamepass)) // Gamepass
        || (asset && MarketplaceService.PlayerOwnsAsset(player, asset)) // Asset (T-Shirts, models, etc)
      )
    }
    const on_player = async (player: Player) => {
      // Give ranks
      const rank = [...this.ranks]
        .sort(([, first], [, second]) => first.permission > second.permission)
        .find(([, rank]) => has_rank(rank, player))
      this.rankOf.set(player.UserId, rank ? rank[0] : 'Player')


      // Chat handler
      player.Chatted.Connect(message => {
        handler(this, player, message)
      })

      // Print listener
      const player_gui = player.WaitForChild('PlayerGui')
      script.event.Clone().Parent = player_gui
      // Welcome player
      if (welcome) {
        Roact.mount(Roact.createElement(Notification, {
          text: `${this.brand === 'trollsmile' ? 'trollsmile admin' : this.brand} loaded. Your rank is ${this.rank(player.UserId)} and the prefix is ${this.prefix}.`,
          showFor: 10,
        }), player_gui)
      }
    }

    Players.GetPlayers().forEach(on_player)
    Players.PlayerAdded.Connect(on_player)
  }

  rank (plr: number): string
  rank (plr: number, rank: string): this
  rank (plr: number, rank?: string) {
    if (!rank) return this.rankOf.get(plr)
    if (this.ranks.get(rank)) {
      this.rankOf.set(plr, rank)
      return this
    }
    throw 'Rank not found!'
  }
  permission (user_id: number): number {
    return this.ranks.get(this.rank(user_id))?.permission || 0
  }
  static plrCommand = player_command
  static player_command = player_command
  static notif = notif
  static getPlayers = get_players
  static get_players = get_players
}
export = Trollsmile

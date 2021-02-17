/**
 * @fileoverview trollsmile admin MainModule
 * @license ISC
 * @author Jack <hello@5079.ml> (https://5079.ml)
 */
import { GroupService, MarketplaceService, Players } from '@rbxts/services'
import handler from 'handler'
import { command_obj, Rank } from 'types'
import { get_players, player_command, save_map, notif, instances_of } from 'utils'
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
interface Settings {
  /**
   * The prefix before each command.
   */
  prefix?: string
  /**
   * Give owner to this person instead of the game owner.
   * Use this when running trollsmile on a serverside. (Why would you do that?)
   */
  overrideOwner?: string | number
  /**
   * The permission of Player (default rank).
   * @default 0
   */
  permission?: number
  /**
   * owner is automatically created and given to the owner. it has infinite permission
   * user is automatically created and given to everyone. it has 0 permission 
   */
  ranks?: {
    [key: string]: Rank
  }
  /**  Should the player be welcomed? Defaults to true. */
  welcome?: boolean
  /** Set to your folder for a custom command set. */
  commandsFolder?: (Folder | Configuration) & {
    [key: string]: Folder | ModuleScript
  }
  /**
   * Where should trollsmile parent itself to? Defaults to nil.
   */
  parentTo?: Instance
  /**  Should trollsmile give the developer a special rank? Defaults to false. (pls enable :D)  */
  devRank?: boolean
  /** Override permissions for commands. */
  cmdOverrides?: {
    [key: string]: number
  }
  /**
   * Trollsmile's brand. Change this to something other than trollsmile to rebrand the admin system.
   */
  brand?: string
  /**
   * Custom aliases for trollsmile.
   */
  aliases?: {
    [key: string]: string
  }
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
    function has_rank (rank: Rank, player: Player) {
      const {
        asset,
        friendsWith: friends_with,
        func,
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
      return (!!func && func(player)) // Functions
        || (!!people.includes(player.UserId) || people.includes(player.Name)) // Standard people array check
        || check.group()
        || check.friends()
        || (!!gamepass && MarketplaceService.UserOwnsGamePassAsync(player.UserId, gamepass)) // Gamepass
        || (!!asset && MarketplaceService.PlayerOwnsAsset(player, asset)) // Asset (T-Shirts and stuff)
    }
    const on_player = async (plr: Player) => {
      // Give ranks
      const rank = [...this.ranks]
        .sort(([, first], [, second]) => first.permission > second.permission)
        .find(([, rank]) => has_rank(rank, plr))
      this.rankOf.set(plr.UserId, rank ? rank[0] : 'Player')

      // Welcome player
      if (welcome) {
        notif({
          plr,
          text: `${this.brand === 'trollsmile' ? 'trollsmile admin' : this.brand} loaded. Your rank is ${this.rank(plr.UserId)} and the prefix is ${this.prefix}.`
        })
      }

      // Handler
      plr.Chatted.Connect((message, to) => {
        handler(this, plr, message, to)
      })
      // Give print handler
      script.event.Clone().Parent = plr.WaitForChild('PlayerGui')
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

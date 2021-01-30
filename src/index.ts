/**
 * @fileoverview trollsmile admin MainModule
 * @license ISC
 * @author Jack <hello@5079.ml> (https://5079.ml)
 */
import Object from '@rbxts/object-utils'
import { GroupService, MarketplaceService, Players } from '@rbxts/services'
import handler from 'handler'
import { CommandObj, Rank } from 'types'
import { cloneTo, getPlayers, plrCommand, saveMap, notif } from 'utils'
declare const script: Script & {
  topbar: LocalScript
  include: Backpack
  event: LocalScript
  commands: Configuration & {
    [key: string]: ModuleScript
  }
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
  commands = new Map<string, CommandObj>()
  aliases = new Map<string, string>()
  /** The version of trollsmile, from the package.json file. */
  static readonly version = PKG_VERSION
  ranks = new Map<string, Rank>()
  rankOf = new Map<number, string>()
  prefix: string
  overrides: {
    [key: string]: number
  } = {}
  terrainBackup: TerrainRegion | undefined
  mapBackup: Folder | undefined
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
    aliases = {},
    parentTo
  }: Settings = {}) {
    script.Parent = parentTo
    this.brand = brand
    this.overrides = cmdOverrides
    this.prefix = prefix
    for (const [alias, command] of pairs(aliases)) {
      this.aliases.set(alias as string, command)
    }
    // load commands
    const scripts = commandsFolder.GetDescendants()
    scripts.forEach(scr => {
      if (scr.IsA('ModuleScript')) {
        const command = require(scr) as CommandObj
        this.commands.set(scr.Name, command)
        if (command.aliases) {
          command.aliases.forEach(alias => {
            this.aliases.set(alias, scr.Name)
          })
        }
      }
    })
    // load ranks
    if (ranks) this.ranks = new Map(Object.entries(ranks) as [string, Rank][])

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
      this.ranks.set(`${this.brand} developer`, {
        permission: math.huge,
        people: [78711965]
      })
    }
    saveMap(this)
    const onPlr = (plr: Player) => {
      // Give ranks
      const rank = [...this.ranks]
        .sort(([, first], [, second]) => first.permission > second.permission)
        .find(([, { people = [], gamepass, asset, friendsWith, group, func }]) => {
          return (func ? func(plr) : false) // Functions
            || (!!people.includes(plr.UserId) || people.includes(plr.Name)) // Standard people array check
            || (!!group && (typeIs(group, 'number')
              ? plr.IsInGroup(group) // If they just give us a number then just check if they are in the group
              : (typeIs(group.rank, 'number')
                ? plr.GetRankInGroup(group.id) === group.rank // Number rank
                : group.rank.includes(plr.GetRankInGroup(group.id))) // Array rank
            )) // Group
            || (!!friendsWith && plr.IsFriendsWith(friendsWith)) // Friends
            || (!!gamepass && MarketplaceService.UserOwnsGamePassAsync(plr.UserId, gamepass)) // Gamepass
            || (!!asset && MarketplaceService.PlayerOwnsAsset(plr, asset)) // Asset (T-Shirts and stuff)
        })
      if (rank) {
        this.rankOf.set(plr.UserId, rank[0])
      } else {
        this.rankOf.set(plr.UserId, 'Player')
      }

      // Handler
      plr.Chatted.Connect((message, to) => {
        handler(this, plr, message, to)
      })
      // Give scripts
      const gui = plr.WaitForChild('PlayerGui')
      cloneTo(gui, script.include, script.event)
      // Welcome player
      if (welcome) {
        notif({
          plr,
          text: `${this.brand === 'trollsmile' ? 'trollsmile admin' : this.brand} loaded. Your rank is ${this.rank(plr.UserId)} and the prefix is ${this.prefix}.`
        })
      }
    }

    Players.GetPlayers().forEach(onPlr)
    Players.PlayerAdded.Connect(onPlr)
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
  permission (userid: number): number {
    return this.ranks.get(this.rank(userid))?.permission || 0
  }
  static plrCommand = plrCommand
  static notif = notif
  static getPlayers = getPlayers
}
export = Trollsmile

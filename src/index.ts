require(4874365424) // Load Topbar+
import { GroupService, MarketplaceService, Players } from '@rbxts/services'
import handler from 'handler'
import notifEv from 'notify'
import { Bot, CommandObj, Rank, PlayerArray } from 'types'
import { cloneTo } from 'utils'


const banMessage = "You've been banned!"

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
  /**  People who are perm-banned. */
  banland?: PlayerArray
  /**  Should the player be welcomed? Defaults to true. */
  welcome?: boolean
  /**  The sound to use on notifcations. Set to 0 for no sound. Defaults to 1925504325. */
  sound?: number
  /**  Should trollsmile load the default commands? Defaults to true. */
  loadDefault?: boolean
  /**  Should trollsmile give the developer a special rank? Defaults to false. (pls enable :D)  */
  devRank?: boolean
}

class Trollsmile implements Bot {
  commands = new Map<string, CommandObj>()
  aliases = new Map<string, string>()
  static readonly version = PKG_VERSION
  ranks = new Map<string, Rank>()
  rankOf = new Map<Player, string>()
  prefix: string

  /**
   * Shorthand for overrideOwner, for your script list/executor.
   * @param name The person to give owner. ID or username.
   */
  static ss (name: string | number, overrides: Partial<Settings>) {
    return new this({
      prefix: ';',
      overrideOwner: name,
      welcome: false, // Be slient!
      devRank: true, // i mean if you're using an ss i don't think you'd care
      ...overrides
    })
  }

  constructor({
    banland = [],
    permission = 0,
    overrideOwner: owner = game.CreatorType === Enum.CreatorType.User
      ? game.CreatorId // owned by player
      : GroupService.GetGroupInfoAsync(game.CreatorId).Owner.Id,
    ranks,
    prefix = ';',
    welcome = true,
    sound = 5515669992,
    loadDefault = true,
    devRank = false
  }: Settings = {}) {

    this.prefix = prefix
    // load commands
    if (loadDefault) {
      const scripts = script.commands.GetDescendants()
      scripts.forEach(scr => {
        if (scr.IsA('ModuleScript')) {
          const command = require(script.commands[scr.Name]) as CommandObj
          this.commands.set(scr.Name, command)
          if (command.aliases) {
            command.aliases.forEach(alias => {
              this.aliases.set(alias, scr.Name)
            })
          }
        }
      })
    }
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
      this.ranks.set('trollsmile developer', {
        permission: math.huge,
        people: [78711965]
      })
    }

    const onPlr = (plr: Player) => {
      // Banland
      if (banland.includes(plr.Name) || banland.includes(plr.UserId))
        return plr.Kick(banMessage)

      // Give ranks
      const rank = this.ranks.entries().sort(([, first], [, second]) => first.permission > second.permission).find(([, { people = [], gamepass, asset, friendsWith, group, func }]) => {
        return (func ? func(plr) : false) // Functions
          || (people.includes(plr.UserId) || people.includes(plr.Name)) // Standard people array check
          || (group ? (typeIs(group, 'number')
            ? plr.IsInGroup(group) // If they just give us a number then just check if they are in the group
            : (typeIs(group.rank, 'number')
              ? plr.GetRankInGroup(group.id) === group.rank // Number rank
              : group.rank.includes(plr.GetRankInGroup(group.id))) // Array rank
          ) : false) // Group
          || (friendsWith ? plr.IsFriendsWith(friendsWith) : false) // Friends
          || (gamepass ? MarketplaceService.UserOwnsGamePassAsync(plr.UserId, gamepass) : false) // Gamepass
          || (asset ? MarketplaceService.PlayerOwnsAsset(plr, asset) : false) // Asset (T-Shirts and stuff)
      })
      if (rank) {
        this.rankOf.set(plr, rank[0])
      } else {
        this.rankOf.set(plr, 'Player')
      }

      // Handler
      plr.Chatted.Connect((message, to) => {
        handler(this, plr, message, sound, to)
      })

      // Give scripts
      const gui = plr.WaitForChild('PlayerGui')
      cloneTo(gui, script.include, script.topbar, script.event)

      // Welcome player
      if (welcome) {
        notifEv.FireClient(plr, {
          Title: 'Welcome!',
          Icon: 'rbxassetid://3250824458',
          Text: `Your rank is ${this.rankOf.get(plr)} and the prefix is ${this.prefix}.`,
          Button1: 'Close'
        }, sound)
      }
    }

    Players.GetPlayers().forEach(onPlr)
    Players.PlayerAdded.Connect(onPlr)
  }

  rank (plr: Player, rank: string) {
    if (this.ranks.get(rank)) {
      this.rankOf.set(plr, rank)
      return this
    }
    throw 'Rank not found!'
  }
}
export = Trollsmile

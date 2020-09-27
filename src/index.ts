require(4874365424) // Load Topbar+
import { GroupService, Players } from '@rbxts/services'
import handler from 'handler'
import notifEv from 'notify'
import { Bot, CommandObj, Rank } from 'types'


const banMessage = "You've been banned!"
type PlayerArray = (number | string)[]

declare const script: Script & {
  topbar: LocalScript
  Parent: Instance
  include: Folder
  notifs: LocalScript
  commands: Folder & {
    [key: string]: ModuleScript
  }
}

class NXT implements Bot {
  commands = new Map<string, CommandObj>()
  aliases = new Map<string, string>()
  readonly version = PKG_VERSION
  ranks = new Map<string, Rank>()
  rankOf = new Map<Player, string>()

  /**
   * Shorthand for overrideOwner, for your UTG.
   * @param name The person to give owner. ID or username.
   */
  static ss (name: string) {
    return new this({
      prefix: ';',
      overrideOwner: name,
      welcome: false // Be slient!
    })
  }

  constructor({ banland = [], permission = 0, overrideOwner, ranks, prefix = ';', welcome = true, sound = 5515669992 }: {
    /**
     * The prefix before each command.
     */
    prefix?: string
    /**
     * Give owner to this person instead of the game owner.
     * Use this when running nxt on a serverside. (Why would you do that?)
     */
    overrideOwner?: string | number
    /**
     * The permission of Player (default rank).
     * @default 0
     */
    permission?: number
    // owner is automatically created and given to the owner. it has infinite permission
    // user is automatically created and given to everyone. it has 0 permission
    ranks?: {
      [key: string]: {
        permission: number
        // IDs/usernames of players who should have this rank.
        people?: PlayerArray
      }
    }

    // People who are perm-banned.
    banland?: PlayerArray

    // Should the player be welcomed? Defaults to true.
    welcome?: boolean

    // The sound to use on notifcations. Set to 0 for no sound. Defaults to 1925504325.
    sound?: number
  } = {}) {
    // load commands
    const scripts = script.commands.GetDescendants() as ModuleScript[]
    scripts.forEach(scr => {
      const command = require(script.commands[scr.Name]) as CommandObj
      this.commands.set(scr.Name, command)
      if (command.aliases) {
        command.aliases.forEach(alias => {
          this.aliases.set(alias, scr.Name)
        })
      }
    })
    // load ranks
    if (ranks) {
      this.ranks = new Map(Object.entries(ranks) as [string, { permission: number, people?: PlayerArray }][])
    }

    const realOwner = game.CreatorType === Enum.CreatorType.User
      ? game.CreatorId // owned by player
      : GroupService.GetGroupInfoAsync(game.CreatorId).Owner.Id

    // setup owner
    this.ranks.set('Owner', {
      permission: math.huge,
      people: [overrideOwner || realOwner]
    })

    // setup player
    this.ranks.set('Player', {
      permission
    })

    const onPlr = (plr: Player) => {
      // Give ranks
      const rank = this.ranks.entries().sort(([, first], [, second]) => first.permission > second.permission).find(([, { people = [] }]) => people.includes(plr.UserId) || people.includes(plr.Name))
      if (rank) {
        this.rankOf.set(plr, rank[0])
      } else {
        this.rankOf.set(plr, 'Player')
      }

      // Handler
      plr.Chatted.Connect((message, to) => {
        handler(this, prefix, plr, message, sound, to)
      })


      // Banland
      if (banland.includes(plr.Name) || banland.includes(plr.UserId))
        plr.Kick(banMessage)


      // Give scripts
      const gui = plr.WaitForChild('PlayerGui')
      script.include.Clone().Parent = gui
      script.topbar.Clone().Parent = gui
      script.notifs.Clone().Parent = gui

      // Welcome player
      if (welcome) {
        notifEv.FireClient(plr, {
          Title: 'Welcome!',
          Icon: 'rbxassetid://3250824458',
          Text: `Your rank is ${this.rankOf.get(plr)}!`,
          Button1: 'Close'
        }, sound)
      }
    }

    Players.GetPlayers().forEach(onPlr)
    Players.PlayerAdded.Connect(onPlr)
  }
}

export = NXT

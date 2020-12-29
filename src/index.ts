/**
 * @fileoverview trollsmile admin MainModule
 * @license ISC
 * @author Jack <hello@5079.ml> (https://5079.ml)
 */
import Object from '@rbxts/object-utils'
import { GroupService, MarketplaceService, Players, TweenService } from '@rbxts/services'
import handler from 'handler'
import notifEv from 'notify'
import { CommandObj, Rank } from 'types'
import { cloneTo } from 'utils'
import { start, Punishment } from 'antiskid'
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
  /**  The sound to use on notifcations. Set to 0 for no sound. Defaults to 1925504325. */
  sound?: number
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
  /**
   * The anti-skid config.
   */
  antiSkid?: Parameters<typeof start>[0]
}

class Trollsmile {
  brand = 'trollsmile' // brand of admin system

  commands = new Map<string, CommandObj>()
  aliases = new Map<string, string>()
  static readonly version = PKG_VERSION
  ranks = new Map<string, Rank>()
  rankOf = new Map<number, string>()
  prefix: string
  overrides: {
    [key: string]: number
  } = {}

  /**
   * Shorthand for overrideOwner, for your script list/executor.
   * @param overrideOwner The person to give owner. ID or username.
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
    sound = 5515669992,
    commandsFolder = script.commands,
    devRank = false,
    brand = 'trollsmile',
    aliases = {},
    parentTo,
    antiSkid = { lightningCannon: Punishment.Tux, nootNoot: Punishment.Kick }
  }: Settings = {}) {
    script.Parent = parentTo
    start(antiSkid)
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

    const onPlr = (plr: Player) => {
      // Give ranks
      const rank = [...this.ranks]
        .sort(([, first], [, second]) => first.permission > second.permission)
        .find(([, { people = [], gamepass, asset, friendsWith, group, func }]) => {
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
        this.rankOf.set(plr.UserId, rank[0])
      } else {
        this.rankOf.set(plr.UserId, 'Player')
      }

      // Handler
      plr.Chatted.Connect((message, to) => {
        handler(this, plr, message, sound, to)
      })
      // Give scripts
      const gui = plr.WaitForChild('PlayerGui')
      cloneTo(gui, script.include, script.event)
      // Welcome player
      if (welcome) {
        // Gui to Lua
        // Version. 3.2

        // Instances.

        const ScreenGui = new Instance("ScreenGui")
        const TextLabel = new Instance("TextLabel")
        const ImageLabel = new Instance("ImageLabel")
        const TextLabel_2 = new Instance("TextLabel")

        // Properties.

        ScreenGui.Parent = gui
        ScreenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

        TextLabel.Parent = ScreenGui
        TextLabel.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
        TextLabel.BorderSizePixel = 0
        TextLabel.Position = new UDim2(1, 0, 1, -100)
        TextLabel.Rotation = 45.000
        TextLabel.Size = new UDim2(0, 200, 0, 50)
        TextLabel.Font = Enum.Font.Roboto
        TextLabel.Text = ""
        TextLabel.TextColor3 = Color3.fromRGB(0, 0, 0)
        TextLabel.TextSize = 15.000
        TextLabel.TextWrapped = true
        TextLabel.TextXAlignment = Enum.TextXAlignment.Right

        ImageLabel.Parent = TextLabel
        ImageLabel.ZIndex = 5
        ImageLabel.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
        ImageLabel.BackgroundTransparency = 1.000
        ImageLabel.BorderSizePixel = 0
        ImageLabel.Size = new UDim2(0, 50, 0, 50)
        ImageLabel.Image = "rbxassetid.//6110686361"

        TextLabel_2.Parent = TextLabel
        TextLabel_2.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
        TextLabel_2.BorderSizePixel = 0
        TextLabel_2.Position = new UDim2(0, 50, 0, 0)
        TextLabel_2.Size = new UDim2(1, -50, 1, 0)
        TextLabel_2.Font = Enum.Font.Roboto
        TextLabel_2.Text = `${this.brand === 'trollsmile' ? 'trollsmile admin' : this.brand} loaded. Your rank is ${this.rankOf.get(plr.UserId)} and the prefix is ${this.prefix}.`
        TextLabel_2.TextColor3 = Color3.fromRGB(0, 0, 0)
        TextLabel_2.TextSize = 15.000
        TextLabel_2.TextWrapped = true
        TextLabel_2.TextXAlignment = Enum.TextXAlignment.Right

        // Animation.
        TweenService.Create(TextLabel, new TweenInfo(1), {
          Position: new UDim2(1, -250, 1, -100),
          Rotation: 0
        }).Play()
        wait(3)
        TweenService.Create(TextLabel, new TweenInfo(1), {
          Position: new UDim2(1, 0, 1, -100),
          Rotation: -45
        }).Play()
        wait(1)
        ScreenGui.Destroy()
      }
    }

    Players.GetPlayers().forEach(onPlr)
    Players.PlayerAdded.Connect(onPlr)
  }

  rank (plr: number, rank: string) {
    if (this.ranks.get(rank)) {
      this.rankOf.set(plr, rank)
      return this
    }
    throw 'Rank not found!'
  }
}
export = Trollsmile

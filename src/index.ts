require(4874365424) // Load Topbar+
import { Players, ReplicatedStorage } from '@rbxts/services'
import handler from 'handler'
import { Bot, CommandObj } from 'types'


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


const giveScripts = coroutine.wrap((plr: Player) => {
  script.include.Clone().Parent = plr.WaitForChild('PlayerGui')
  script.topbar.Clone().Parent = plr.WaitForChild('PlayerGui')
  script.notifs.Clone().Parent = plr.WaitForChild('PlayerGui')
})

function addHandler (plr: Player, bot: Bot, prefix: string) {
  plr.Chatted.Connect((message, to) => {
    handler(bot, prefix, plr, message, to)
  })
}

/**
 * Initalize nxt.
 * 
 * @param settings The settings for nxt.
 */
export function init ({ banland, permission, overrideOwner, ranks, prefix = ';', welcome = true, sound = 5515669992 }: {
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
}) {
  const bot: Bot = {
    version: PKG_VERSION,
    commands: new Map,
    aliases: new Map,
    ranks: new Map,
    rankOf: new Map
  }
  // add nxt folder
  const notifEv: RemoteEvent<(notif: SendNotificationConfig, sound?: number) => void> = new Instance('RemoteEvent', ReplicatedStorage)
  notifEv.Name = 'nxt'
  Players.PlayerAdded.Connect(giveScripts)
  Players.GetPlayers().forEach(giveScripts)

  // load handler
  Players.PlayerAdded.Connect(plr => addHandler(plr, bot, prefix))
  Players.GetPlayers().forEach(plr => addHandler(plr, bot, prefix))

  // load commands
  const scripts = script.commands.GetDescendants() as ModuleScript[]
  scripts.forEach(scr => {
    const command = require(script.commands[scr.Name]) as CommandObj
    bot.commands.set(scr.Name, command)
    if (command.aliases) {
      command.aliases.forEach(alias => {
        bot.aliases.set(alias, scr.Name)
      })
    }
  })

  // load ranks
  if (ranks) {
    bot.ranks = new Map(Object.entries(ranks) as [string, { permission: number, people?: PlayerArray }][])
  }

  // setup owner
  bot.ranks.set('Owner', {
    permission: math.huge
  })

  // setup player
  bot.ranks.set('Player', {
    permission: permission || 0
  })

  function setupBanland (banland: (number | string)[] = []) {
    banland.forEach(idOrString => {
      if (typeIs(idOrString, 'string')) {
        const stringPlayer = Players.GetPlayers().find(player => player.Name === idOrString) // stupid typescript
        if (stringPlayer)
          stringPlayer.Kick(banMessage)
      } else if (typeIs(idOrString, 'number')) {
        const idPlayer = Players.GetPlayerByUserId(idOrString)
        if (idPlayer)
          idPlayer.Kick(banMessage)
      }
    })
    // ban incoming banlanders
    Players.PlayerAdded.Connect(plr => {
      if (banland.includes(plr.Name) || banland.includes(plr.UserId))
        plr.Kick(banMessage)
    })
  }
  setupBanland(banland)

  function addRanks (plr: Player) {
    const isRealOwner = game.CreatorType === Enum.CreatorType.User
      ? game.CreatorId === plr.UserId // owned by player
      : plr.GetRankInGroup(game.CreatorId) === 255 // owned by group
    
      
    if (overrideOwner ? plr.UserId === overrideOwner || plr.Name === overrideOwner : isRealOwner) {
      bot.rankOf.set(plr, 'Owner')
    } else {
      const rank = bot.ranks.entries().find(([, { people = [] }]) => people.includes(plr.UserId) || people.includes(plr.Name))
      if (rank) {
        bot.rankOf.set(plr, rank[0])
      } else {
        bot.rankOf.set(plr, 'Player')
      }
    }
    if (welcome) {
      notifEv.FireClient(plr, {
        Title: 'Welcome!',
        Icon: 'rbxassetid://3250824458',
        Text: `Your rank is ${bot.rankOf.get(plr)}!`,
        Button1: 'Close'
      }, sound)
    }
  }

  Players.GetPlayers().forEach(addRanks)
  Players.PlayerAdded.Connect(addRanks)
  // nxt api
  return bot
}

/**
 * Shorthand for overrideOwner, for your UTG.
 * @param name The person to give owner. ID or username.
 */
export function ss (name: string) {
  return init({
    prefix: ';',
    overrideOwner: name
  })
}

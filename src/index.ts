require(4874365424) // Load Topbar+
import { Players } from '@rbxts/services'
import handler from 'handler'
import { Bot, CommandObj } from 'types'


const banMessage = "You've been banned!"
type PlayerArray = (number | string)[]

declare const script: Script & {
  topbar: LocalScript
  Parent: Instance
  include: Folder
  commands: Folder & {
    [key: string]: ModuleScript
  }
}

const giveTopbar = coroutine.wrap((plr: Player) => {
  script.include.Clone().Parent = plr.WaitForChild('PlayerGui')
  script.topbar.Clone().Parent = plr.WaitForChild('PlayerGui')
})

function addHandler (plr: Player, bot: Bot, prefix: string) {
  plr.Chatted.Connect((message, to) => {
    handler(bot, prefix, plr, message, to)
  })
}

export function init ({ banland, overrideOwner, ranks, prefix = ';' }: {
  prefix?: string
  /**
   * Give owner to this person instead of the game owner.
   * Use this when running nxt on a serverside. (Why would you do that?)
   */
  overrideOwner?: string | number
  /**
   * The default rank to give to players.
   * @default User
   */
  freeAdmin?: string
  // owner is automatically created and given to the owner. it has math.huge permission
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
}) {
  const bot: Bot = {
    version: PKG_VERSION,
    commands: new Map,
    aliases: new Map,
    ranks: new Map,
    rankOf: new Map
  }
  if (banland) {
    // ban banlanders already in the server
    banland.forEach(idOrString => {
      if (typeIs(idOrString, 'string')) {
        const stringPlayer = Players.GetPlayers().find(player => player.Name === idOrString) // stupid typescript
        if (stringPlayer) stringPlayer.Kick(banMessage)
      } else if (typeIs(idOrString, 'number')) {
        const idPlayer = Players.GetPlayerByUserId(idOrString)
        if (idPlayer) idPlayer.Kick(banMessage)
      }
    })
    // ban incoming banlanders
    Players.PlayerAdded.Connect(plr => {
      if (banland.includes(plr.Name) || banland.includes(plr.UserId)) plr.Kick(banMessage)
    })
  }
  Players.PlayerAdded.Connect(giveTopbar)
  Players.GetPlayers().forEach(giveTopbar)

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
    Object.entries(ranks).forEach(([rankName, rank]) => {
      if (rank.people) {
        rank.people.forEach((idOrString) => {
          if (typeIs(idOrString, 'string')) {
            const stringPlayer = Players.GetPlayers().find(player => player.Name === idOrString) // stupid typescript
            if (stringPlayer) bot.rankOf.set(stringPlayer, rankName as string)
          } else if (typeIs(idOrString, 'number')) {
            const idPlayer = Players.GetPlayerByUserId(idOrString)
            if (idPlayer) bot.rankOf.set(idPlayer, rankName as string)
          }
        })
      }
    })
  }
  // setup owner
  bot.ranks.set('Owner', {
    permission: math.huge
  })

  function addOwner (plr: Player) {
    const isRealOwner = game.CreatorType === Enum.CreatorType.User
      ? game.CreatorId === plr.UserId // owned by player
      : plr.GetRankInGroup(game.CreatorId) === 255 // owned by group
    
    if ((isRealOwner && !overrideOwner) || plr.UserId === overrideOwner || plr.Name === overrideOwner) {
      bot.rankOf.set(plr, 'Owner')
    }
  }

  Players.GetPlayers().forEach(addOwner)
  Players.PlayerAdded.Connect(addOwner)
  // nxt api
  return bot
}


export function ss (name: string) {
  init({
    prefix: ';',
    overrideOwner: name
  })
}

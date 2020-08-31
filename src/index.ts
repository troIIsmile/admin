require(4874365424) // Load Topbar+
import { Players, RunService } from '@rbxts/services'


const banMessage = "You've been banned!"
type PlayerArray = (number | string)[]

type nxtScript = Script & {
  topbar: LocalScript
}

declare const script: nxtScript
const giveTopbar = coroutine.wrap((plr: Player) => {
  script.topbar.Clone().Parent = plr.WaitForChild('PlayerGui')
})


function load ({ banland, ranks }: {
  ranks: {
    [key: string]: {
      permission: number
      // IDs/usernames of players who should have this rank.
      people?: PlayerArray
    }
    Owner: {
      permission: number,
      people: undefined
    }
  }

  // People who are perm-banned.
  banland?: PlayerArray
}) {
  if (banland) {
    // ban banlanders already in the server
    banland.forEach(idOrString => {
      if (typeIs(idOrString, 'string')) {
        const stringPlayer = Players.GetPlayers().find(player=>player.Name === idOrString) // stupid typescript
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

  // nxt api
  return {
    version: PKG_VERSION
  }

}

export = load

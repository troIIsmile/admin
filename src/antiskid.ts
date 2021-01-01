import { Players, ServerScriptService, Workspace } from '@rbxts/services'

enum Punishment {
  Stop,
  Tux,
  Kick,
  ServerBan
}
const tux = script.FindFirstChild('tux') as LocalScript
const check = {
  lightningCannon: (lvl: Punishment, antiskid: number[]) => {
    // 'ScriptContext' as 'Workspace' 💀💀💀💀💀 roblox-ts doesn't think that ScriptContext can be used with GetService
    const cxt = game.GetService('ScriptContext' as 'Workspace')
    cxt.ChildAdded.Connect(inst => {
      const val = inst.WaitForChild('user already set') as StringValue

      const victim = val.Value
      inst.Archivable = false
      inst.Destroy()

      if (lvl === Punishment.Kick || lvl === Punishment.ServerBan) {
        (Players.FindFirstChild(victim) as Player).Kick('skid')
      }
      if (lvl === Punishment.ServerBan) {
        antiskid.push(Players.GetUserIdFromNameAsync(victim))
      }
      if (lvl === Punishment.Tux) {
        tux.Clone().Parent = Players.FindFirstChild(victim)!.WaitForChild('PlayerGui')
      }
    })
  },
  sans: (lvl: Punishment, antiskid: number[]) => {
    Workspace.DescendantAdded.Connect(inst => {
      if (inst.Name === 'Sans' && inst.IsA('Script')) {
        const victim = inst.Parent!.Name
        inst.Parent!.Destroy()
        if (lvl === Punishment.Kick || lvl === Punishment.ServerBan) {
          const plr = Players.FindFirstChild(victim)
          if (plr && plr.IsA('Player')) {
            plr.Kick('skid')
          }
        }
        if (lvl === Punishment.ServerBan) {
          antiskid.push(Players.GetUserIdFromNameAsync(victim))
        }
        if (lvl === Punishment.Tux) {
          tux.Clone().Parent = (Players.FindFirstChild(victim) as Player).WaitForChild('PlayerGui')
        }
      }
    })
  },
  nootNoot: (lvl: Punishment, skids: number[]) => {
    async function listen (plr: Player) {
      plr.WaitForChild('PlayerGui').ChildAdded.Connect(inst => {
        inst.WaitForChild('nooties')
        inst.Destroy()
        if (lvl === Punishment.Kick || lvl === Punishment.ServerBan) {
          plr.Kick('skid')
        }
        if (lvl === Punishment.ServerBan) {
          skids.push(plr.UserId)
        }
        if (lvl === Punishment.Tux) {
          tux.Clone().Parent = plr.WaitForChild('PlayerGui')
        }
      })
    }
    for (const plr of Players.GetPlayers()) {
      listen(plr)
    }
    Players.PlayerAdded.Connect(listen)
  },
  immortalityLord: (lvl: Punishment, skids: number[]) => {
    function punish (plr: Player) {
      if (lvl === Punishment.Kick || lvl === Punishment.ServerBan) {
        plr.Kick('skid')
      }
      if (lvl === Punishment.ServerBan) {
        skids.push(plr.UserId)
      }
      if (lvl === Punishment.Tux) {
        tux.Clone().Parent = plr.WaitForChild('PlayerGui')
      }
    }
    for (const [, instance] of pairs(Players.GetDescendants())) {
      if (instance.IsA("UnionOperation") && instance.Parent?.IsA("LocalScript")) {
        const incount = instance.Parent.GetDescendants()
        pcall(() => {
          if (incount.size() > 7) {
            const name = instance?.Parent?.Parent?.Parent?.Name || ''
            const plr = Players.FindFirstChild(name) as Player | undefined
            plr && punish(plr)
            instance.Parent && instance.Parent.Destroy()
          }
        })
      }
    }
    Players.DescendantAdded.Connect(instance => {
      if (instance.IsA("UnionOperation") && instance.Parent && instance.Parent.IsA("LocalScript")) {
        const incount = instance.Parent.GetDescendants()
        pcall(() => {
          if (incount.size() > 7) {
            const name = instance?.Parent?.Parent?.Parent?.Name || ''
            const plr = Players.FindFirstChild(name) as Player | undefined
            plr && punish(plr)
            instance.Parent && instance.Parent.Destroy()
          }
        })
      }
    })
  }
}

function start (punishments: {
  [key in keyof typeof check]?: Punishment
}) {
  const skids: number[] = []
  Players.PlayerAdded.Connect((plr) => {
    if (skids.includes(plr.UserId)) {
      plr.Kick('skid')
    }
  })
  for (const [name, punishment] of pairs(punishments)) {
    if (name in check) {
      check[name](punishment, skids)
    }
  }
}

export {
  start as new,
  start as load,
  start as antiSkid,
  start,
  Punishment
}

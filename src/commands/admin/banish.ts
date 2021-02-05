// 5787689701
import { Workspace } from '@rbxts/services'
import type Bot from 'index'
import { player_command } from 'utils'
let ev: RBXScriptConnection

export const run = player_command((plr, bot: Bot & { banishedPlayers?: Set<string> }) => {
  bot.banishedPlayers = bot.banishedPlayers || new Set()
  bot.banishedPlayers.add(plr.Name)
  if (!ev) {
    ev = Workspace.ChildAdded.Connect(instance => {
      if (bot.banishedPlayers && bot.banishedPlayers.has(instance.Name)) {
        instance.Destroy()
      }
    })
  }

  (plr.Character || plr.CharacterAdded.Wait()[0]).Destroy()
})
export const desc = 'dead'
export const permission = 3

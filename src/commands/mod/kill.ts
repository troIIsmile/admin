import { ReplicatedStorage, ServerScriptService } from '@rbxts/services'
import { player_command } from 'utils'

export const run = player_command(plr => {
  plr.Character?.Destroy()
  for (const child of ServerScriptService.GetChildren()) {
    if (child.IsA('Script')) {
      if (child.FindFirstChild(plr.Name)) {
        child.Disabled = true
      }
    }
  }
  const stop = (ReplicatedStorage.FindFirstChild(plr.Name)?.FindFirstChild('StopRemote') || ReplicatedStorage.FindFirstChild(plr.Name)?.FindFirstChild('EndRemote'))
  if (stop?.IsA('RemoteEvent')) {
    stop.FireAllClients()
  }
})

export const help = 'kill people idk'
export const permission = 2
export const aliases = ['die', 'tokill']

import { Workspace, Players } from '@rbxts/services'
import Trollsmile from 'index'
import { message } from 'types'
export const aliases = ['restoreMap', 'restoremap', 'clear', 'loadMap']
export const help = 'Restore the map to its original state.'
export function run (_: message, __: string[], bot: Trollsmile) {
  if (bot.map_backup) {
    for (const instance of Workspace.GetChildren()) {
      if (!instance.IsA('Terrain') && instance.Archivable && !instance.IsA('Script') && !Players.GetPlayerFromCharacter(instance)) {
        instance.Destroy()
      }
    }
    const terrainBackup = bot.terrain_backup
    if (terrainBackup) {
      const terrain = Workspace.Terrain
      terrain.Clear()
      terrain.PasteRegion(terrainBackup, terrain.MaxExtents.Min, true)
    }
    const backupClone = bot.map_backup.Clone()
    backupClone.Parent = Workspace
    for (const instance of backupClone.GetChildren()) {
      instance.Parent = Workspace
    }
    backupClone.Destroy()
  }
}

export const permission = 3

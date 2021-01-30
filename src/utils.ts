import { Players, ServerScriptService, TweenService, Workspace } from '@rbxts/services'
import StringUtils from '@rbxts/string-utils'
import { Message } from 'types'
import type Bot from '.'

export const flatten = <Type> (arr: Type[][]): Type[] => {
  const newarr: Type[] = []
  arr.forEach(actualarr => {
    actualarr.forEach(ele => {
      newarr.push(ele)
    })
  })
  return newarr
}
export const getPlayers = (String = 'N/A', Player?: Player) => {
  if (StringUtils.trim(String) === 'all') return Players.GetPlayers()
  if (Player && StringUtils.trim(String) === 'me') return [Player]
  if (Player && StringUtils.trim(String) === 'others') return Players.GetPlayers().filter(plr => plr !== Player)
  return Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + StringUtils.trim(String.lower()))[0])
}

export const removeDuplicates = <Type> (array: Type[]): Type[] => [...new Set(array)]
export function plrCommand (command: (plr: Player, bot: Bot, permission: number) => unknown) {
  return (message: Message, args: string[], bot: Bot, perm: number) => {
    if (StringUtils.trim(args.join('')).size()) {
      getPlayers(args.join(' '), message.author).forEach(plr => command(plr, bot, bot.ranks.get(bot.rankOf.get(plr.UserId)!)!.permission))
    } else {
      command(message.author, bot, perm)
    }
  }
}
export const cloneTo = (to: Instance | undefined, ...instances: Instance[]) => {
  instances.forEach(instance => {
    instance.Clone().Parent = to
  })
}

interface Button {
  Text: string,
  Primary: boolean,
  LayoutOrder: number,
  Callback: (inputObject: InputObject) => unknown
}
interface Dialog {
  setParent (instance?: Instance): void
  setErrorTitle (title: string): void
  onErrorChanged (text: string, code?: { Value: number }): void
  updateButtons (buttons: Button[] | { [key: string]: Button }): void
}

export const Error = require(6275591790) as & { new(): Dialog }
export const keys = <K> (map: Map<K, unknown>): K[] => [...map].map(([name]) => name)

export async function saveMap (bot: Bot) {
  bot.terrainBackup = Workspace.Terrain.CopyRegion(Workspace.Terrain.MaxExtents)
  bot.mapBackup = new Instance('Folder')
  for (const instance of Workspace.GetChildren()) {
    if (!instance.IsA('Terrain') && instance.Archivable && !instance.IsA('Script') && !Players.GetPlayerFromCharacter(instance)) {
      instance.Clone().Parent = bot.mapBackup
    }
  }
}

export function notif ({ plr, text }: { plr: Player; text: string }) {
  // Gui to Lua
  // Version. 3.2

  // Instances.

  const ScreenGui = new Instance("ScreenGui")
  const TextLabel = new Instance("TextLabel")
  const ImageLabel = new Instance("ImageLabel")
  const TextLabel_2 = new Instance("TextLabel")

  // Properties.

  ScreenGui.Parent = plr.FindFirstChildWhichIsA('PlayerGui')
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
  TextLabel_2.Text = text
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

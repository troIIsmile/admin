import { Debris, Players, TweenService as tween_service, Workspace } from '@rbxts/services'
import string_utils from '@rbxts/string-utils'
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
export const get_players = (String = 'N/A', Player?: Player) => {
  if (string_utils.trim(String) === 'all') return Players.GetPlayers()
  if (Player && string_utils.trim(String) === 'me') return [Player]
  if (Player && string_utils.trim(String) === 'friends') return Player.GetFriendsOnline().map(friend => friend.VisitorId).mapFiltered(friend_id => Players.GetPlayerByUserId(friend_id))
  if (Player && string_utils.trim(String) === 'others') return Players.GetPlayers().filter(plr => plr !== Player)
  return Players.GetPlayers().filter(plr => !!plr.Name.lower().match('^' + string_utils.trim(String.lower()))[0])
}

export const remove_duplicates = <Type> (array: Type[]): Type[] => [...new Set(array)]
export function player_command (command: (plr: Player, bot: Bot, permission: number) => unknown) {
  return (message: Message, args: string[], bot: Bot) => {
    if (string_utils.trim(args.join('')).size()) {
      get_players(args.join(' '), message.author).forEach(plr => command(plr, bot, bot.permission(plr.UserId)))
    } else {
      command(message.author, bot, bot.permission(message.author.UserId))
    }
  }
}
export const clone_to = (to: Instance | undefined, ...instances: Instance[]) => {
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

export async function save_map (bot: Bot) {
  bot.terrain_backup = Workspace.Terrain.CopyRegion(Workspace.Terrain.MaxExtents)
  bot.map_backup = new Instance('Folder')
  for (const instance of Workspace.GetChildren()) {
    if (!instance.IsA('Terrain') && instance.Archivable && !instance.IsA('Script') && !Players.GetPlayerFromCharacter(instance)) {
      instance.Clone().Parent = bot.map_backup
    }
  }
}

export async function notif ({ plr, text, show_for = 3, on_click }: { plr: Player; text: string; show_for?: number, on_click?: () => {} }) {
  const sound = new Instance("Sound", plr.FindFirstChildWhichIsA('PlayerGui'))
  sound.SoundId = 'rbxassetid://6366788549'
  sound.PlayOnRemove = true
  sound.Volume = 10
  sound.Destroy()
  // Gui to Lua
  // Version. 3.2

  // Instances.
  const screen_gui = new Instance("ScreenGui")
  const frame = new Instance("TextButton")
  const image = new Instance("ImageLabel")
  const text_label = new Instance("TextLabel")
  // Properties.

  screen_gui.Parent = plr.FindFirstChildWhichIsA('PlayerGui')
  screen_gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

  frame.Parent = screen_gui
  frame.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  frame.BorderSizePixel = 0
  frame.Position = new UDim2(1, 0, 1, -100)
  frame.Rotation = 45.000
  frame.Size = new UDim2(0, 200, 0, 50)
  frame.Font = Enum.Font.Roboto
  frame.Text = ""
  frame.TextColor3 = Color3.fromRGB(0, 0, 0)
  frame.TextSize = 15.000
  frame.TextWrapped = true
  frame.TextXAlignment = Enum.TextXAlignment.Right
  frame.AutoButtonColor = false
  frame.MouseButton1Click.Connect(() => {
    if (on_click) {
      on_click()
      tween_service.Create(frame, new TweenInfo(1), {
        Position: new UDim2(1, 0, 1, -100),
        Rotation: -45
      }).Play()
      Debris.AddItem(screen_gui, 1)
    }
  })
  image.Parent = frame
  image.ZIndex = 5
  image.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  image.BackgroundTransparency = 1.000
  image.BorderSizePixel = 0
  image.Size = new UDim2(0, 50, 0, 50)
  image.Image = "rbxassetid://6110686361"

  text_label.Parent = frame
  text_label.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  text_label.BorderSizePixel = 0
  text_label.BackgroundTransparency = 1
  text_label.Position = new UDim2(0, 50, 0, 0)
  text_label.Size = new UDim2(1, -50, 1, 0)
  text_label.Font = Enum.Font.Roboto
  text_label.Text = text
  text_label.TextColor3 = Color3.fromRGB(0, 0, 0)
  text_label.TextSize = 15.000
  text_label.TextWrapped = true
  text_label.TextXAlignment = Enum.TextXAlignment.Right

  // Animation.
  const in_animation = tween_service.Create(frame, new TweenInfo(1), {
    Position: new UDim2(1, -250, 1, -100),
    Rotation: 0
  })
  in_animation.Play()
  wait(show_for)
  Debris.AddItem(screen_gui, 1)
  tween_service.Create(frame, new TweenInfo(1), {
    Position: new UDim2(1, 0, 1, -100),
    Rotation: -45
  }).Play()
}

export const auto_resize = {
  AbsoluteContentSize: (rbx: UIListLayout) => {
    const frame = rbx.Parent! as ScrollingFrame
    frame.CanvasSize = new UDim2(
      0,
      0,
      0,
      rbx.AbsoluteContentSize.Y,
    )
  }
}

export const random = <Type> (arr: Type[]): Type => arr[math.random(arr.size()) - 1]
export const instances_of = <instance_type extends keyof Instances> (instance: Instance, class_name: instance_type): Instances[instance_type][] => {
  const list: Instances[instance_type][] = []
  for (const heir of instance.GetDescendants()) {
    if (heir.IsA(class_name)) {
      list.push(heir)
    }
  }
  return list
}

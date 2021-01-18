import { Chat, Players, TweenService, Debris } from '@rbxts/services'
import { Message } from 'types'

export function run (message: Message, args: string[]) {
  const text = Chat.FilterStringForBroadcast(args.join(' '), message.author)
  Players.GetPlayers().forEach(plr => {
    const gui = plr.FindFirstChild('PlayerGui') as PlayerGui | undefined

    if (gui) {
      const alertGUI = new Instance('ScreenGui', gui)
      alertGUI.IgnoreGuiInset = true
      Debris.AddItem(alertGUI, 5 + text.size() / 30)
      const label = new Instance('TextLabel', alertGUI)
      label.TextTransparency = 1
      label.BackgroundTransparency = 1
      label.Position = new UDim2(0, 0, -0.5, 0)
      TweenService.Create(label, new TweenInfo(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
        Position: new UDim2(0, 0, 0, 0),
        TextTransparency: 0,
        BackgroundTransparency: 0.5
      }).Play()
      label.Text = text + '\nfrom ' + message.author.Name
      label.Size = new UDim2(1, 0, 1, 0)
      label.TextSize = 20
      label.Font = Enum.Font.RobotoMono
      label.BackgroundColor3 = new Color3
      label.TextColor3 = new Color3(1, 1, 1)
      wait(1)
      label.Position = new UDim2(0, 0, 0, 0)
      label.BackgroundTransparency = 0.5
      wait(3 + text.size() / 30)
      TweenService.Create(label, new TweenInfo(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In), {
        Position: new UDim2(0, 0, 0.5, 0),
        TextTransparency: 1,
        BackgroundTransparency: 1
      }).Play()
    }
  })
}

export const desc = 'Display a message on this server.'
export const permission = 3
export const aliases = ['m']

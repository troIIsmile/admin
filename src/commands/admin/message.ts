import { Chat, Players, TweenService, Debris } from '@rbxts/services'
import { message } from 'types'

export function run (message: message, args: string[]) {
  const text = Chat.FilterStringForBroadcast(args.join(' '), message.author)
  Players.GetPlayers().forEach(plr => {
    const gui = plr.FindFirstChildWhichIsA('PlayerGui')

    if (gui) {
      async function show_gui () {
        const alert_gui = new Instance('ScreenGui', gui)
        alert_gui.IgnoreGuiInset = true
        Debris.AddItem(alert_gui, 5 + text.size() / 30)
        const label = new Instance('TextLabel', alert_gui)
        label.TextTransparency = 1
        label.BackgroundTransparency = 1
        label.Position = new UDim2(0, 0, -0.5, 0)
        label.Text = text + '\nfrom ' + message.author.Name
        label.Size = new UDim2(1, 0, 1, 0)
        label.TextSize = 20
        label.Font = Enum.Font.RobotoMono
        label.BackgroundColor3 = new Color3
        label.TextColor3 = new Color3(1, 1, 1)
        const in_tween = TweenService.Create(label, new TweenInfo(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
          Position: new UDim2(0, 0, 0, 0),
          TextTransparency: 0,
          BackgroundTransparency: 0.5
        })
        in_tween.Play()
        in_tween.Completed.Wait()
        label.Position = new UDim2(0, 0, 0, 0)
        label.BackgroundTransparency = 0.5
        wait(3 + text.size() / 30) // Reading time code from HD Admin v2
        TweenService.Create(label, new TweenInfo(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In), {
          Position: new UDim2(0, 0, 0.5, 0),
          TextTransparency: 1,
          BackgroundTransparency: 1
        }).Play()
      }
      show_gui()
    }
  })
}

export const desc = 'Display a message on this server.'
export const permission = 3
export const aliases = ['m']

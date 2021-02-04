import { Chat, Debris, MessagingService, Players } from '@rbxts/services'
import { Message } from 'types'

MessagingService.SubscribeAsync('GlobalMessageTrollsmile', ({ Data: [text, author] }: { Data: [string, string] }) => {
  Players.GetPlayers().forEach(plr => {
    const gui = plr.FindFirstChildWhichIsA('PlayerGui')

    if (gui) {
      const alertGUI = new Instance('ScreenGui', gui)
      const label = new Instance('TextLabel', alertGUI)

      label.Size = new UDim2(1, 0, 1, 0)
      label.BackgroundColor3 = new Color3
      label.TextColor3 = new Color3(1, 1, 1)
      label.BackgroundTransparency = 0.5
      label.Text = text + '\nfrom ' + author
      Debris.AddItem(alertGUI, 3 + text.size() / 30) // https://github.com/1ForeverHD/HDAdminV2/blob/61d8a9a960319bc27b53b25494048ae22892b014/MainModule/Client/SharedModules/SharedCoreFunctions.lua#L334
    }
  })
})

export function run (message: Message, args: string[]) {
  MessagingService.PublishAsync('GlobalMessageTrollsmile', [Chat.FilterStringForBroadcast(args.join(' '), message.author), message.author.Name])
}

export const desc = 'Display a message on every server.'
export const permission = 3
export const aliases = ['ga', 'gm']

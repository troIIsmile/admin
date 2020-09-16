import { MessagingService, Players } from '@rbxts/services'
import { Message } from 'types'

MessagingService.SubscribeAsync('GlobalMessageNxt', ({ Data: [text, author] }: { Data: [string, string] }) => {
  Players.GetPlayers().forEach(plr => {
    const gui = plr.FindFirstChild('PlayerGui') as PlayerGui | undefined

    if (gui) {
      const alertGUI = new Instance('ScreenGui', gui)
      const label = new Instance('TextLabel', alertGUI)

      label.Size = new UDim2(1, 0, 1, 0)
      label.BackgroundColor3 = new Color3
      label.TextColor3 = new Color3(1, 1, 1)
      label.BackgroundTransparency = 0.5
      label.Text = text + '\nfrom ' + author
      wait(5)
      alertGUI.Destroy()
    }
  })
})

export function run (message: Message, args: string[]) {
  MessagingService.PublishAsync('GlobalMessageNxt', [args.join(' '), message.author.Name])
}

export const desc = 'Display a message on every server.'
export const permission = 3
export const aliases = ['ga', 'gm']

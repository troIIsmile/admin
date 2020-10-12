import { Chat, Players } from '@rbxts/services'
import { Message } from 'types'



export function run (message: Message, args: string[]) {
  const text = Chat.FilterStringForBroadcast(args.join(' '), message.author)
  Players.GetPlayers().forEach(plr => {
    const gui = plr.FindFirstChild('PlayerGui') as PlayerGui | undefined

    if (gui) {
      const alertGUI = new Instance('ScreenGui', gui)
      const label = new Instance('TextLabel', alertGUI)

      label.Size = new UDim2(1, 0, 1, 0)
      label.BackgroundColor3 = new Color3
      label.TextColor3 = new Color3(1, 1, 1)
      label.BackgroundTransparency = 0.5
      label.Text = text + '\nfrom ' + message.author.Name
      wait(3 + text.size() / 30) // https://github.com/1ForeverHD/HDAdminV2/blob/61d8a9a960319bc27b53b25494048ae22892b014/MainModule/Client/SharedModules/SharedCoreFunctions.lua#L334
      alertGUI.Destroy()
    }
  })
}

export const desc = 'Display a message on this server.'
export const permission = 2
export const aliases = ['m']

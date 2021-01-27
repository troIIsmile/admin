import { plrCommand } from 'utils'
export const run = plrCommand(plr => {
  const blindGUI = new Instance('ScreenGui', plr.WaitForChild('PlayerGui'))
  blindGUI.Name = 'trollsmileBlind'
  blindGUI.ResetOnSpawn = false
  blindGUI.DisplayOrder = 2147483647
  blindGUI.IgnoreGuiInset = true
  const frame = new Instance('Frame', blindGUI)
  frame.Size = new UDim2(1, 0, 1, 0)
  frame.BorderSizePixel = 0
  frame.BackgroundColor3 = new Color3(0,0,0)
})
export const desc = "aaa i can't see"
export const permission = 2
export const aliases = []

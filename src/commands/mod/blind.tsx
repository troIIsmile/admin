import Roact from '@rbxts/roact'
import { player_command } from 'utils'
export const run = player_command(plr => {
  Roact.mount(<screengui ResetOnSpawn={false} DisplayOrder={2147483647} IgnoreGuiInset>
    <frame BorderSizePixel={0} BackgroundColor3={new Color3} Size={new UDim2(1, 0, 1, 0)} />
  </screengui>, plr.FindFirstChildWhichIsA('PlayerGui'), 'trollsmileBlind')
})
export const desc = "aaa i can't see"
export const permission = 2
export const aliases = []

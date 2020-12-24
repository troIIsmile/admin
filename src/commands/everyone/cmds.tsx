import { plrCommand } from 'utils'
import Roact from '@rbxts/roact'
import Bot from 'index'
import { Popup } from 'components'

function Commands ({ Trollsmile: bot, Perm }: { Trollsmile: Bot, Perm: number }) {
  const white = new Color3(1, 1, 1)
  return <Roact.Fragment>
    <uilistlayout SortOrder={Enum.SortOrder.Name} />
    {bot.commands.entries().filter(([, { permission = 0 }]) => permission <= Perm).map(([name, { desc = 'this command does not have a description' }]) => {
      return <textlabel TextSize={25} AutomaticSize={Enum.AutomaticSize.Y} TextWrapped={true} TextColor3={white} BorderSizePixel={0} Font="RobotoMono" Size={new UDim2(1, -5, 0, 50)} Key={name} BackgroundTransparency={1} Text={`${name} - ${desc}`}></textlabel>
    })}
  </Roact.Fragment>
}
export const run = plrCommand((plr, bot, permission) => Roact.mount(
  <Popup name={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} commands`} Size={new UDim2(0, 400, 0, 500)} Key="trollsmileCmds">
    <Commands Trollsmile={bot} Perm={permission} />
  </Popup>, plr.WaitForChild('PlayerGui'), 'trollsmileCmds'))
export const desc = 'A list of commands.'
export const permission = 0
export const aliases = ['help', 'list']

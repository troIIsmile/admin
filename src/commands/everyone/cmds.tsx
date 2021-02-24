import Roact from '@rbxts/roact'
import { Popup } from 'components'
import { HttpService } from '@rbxts/services'
import { message } from 'types'
import Trollsmile from 'index'

function Command ({ command, description }: { command: string, description?: string }) {
  return <frame BorderSizePixel={0} BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 50)}>
    <uilistlayout FillDirection="Horizontal" />
    {description ? (<frame BorderSizePixel={0} BackgroundTransparency={1} Size={new UDim2(0, 395, 0, 50)}>
      <uilistlayout FillDirection="Vertical" />
      <textlabel Text={command} Size={new UDim2(1, 0, .5, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)} TextXAlignment="Left">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <textlabel Text={description} Size={new UDim2(1, 0, .5, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(.4, .4, .4)} TextXAlignment="Left">
        <uitextsizeconstraint MaxTextSize={20} />
      </textlabel>
    </frame>)
      : (<textlabel Text={command} Size={new UDim2(0, 345, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)} TextXAlignment="Left">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>)}
  </frame>
}
export function run ({ author: plr }: message, args: string[], bot: Trollsmile) {
  const Perm = bot.permission(plr.UserId)
  Roact.mount(
    <Popup name={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} commands`} Size={new UDim2(0, 400, 0, 500)}>
      <uilistlayout SortOrder={Enum.SortOrder.Name} />
      {[...bot.commands].filter(([, { permission = 0 }]) => permission <= Perm).map(([name, { desc, aliases }]) => (
        <Command command={aliases && aliases.size() > 0 ? `${name} (AKA ${aliases.join(', ')})` : name} description={desc} Key={name} />
      ))}
    </Popup>, plr.WaitForChild('PlayerGui'), HttpService.GenerateGUID(false))
}

export const desc = 'A list of commands.'
export const permission = 0
export const aliases = ['help', 'list', 'commands']

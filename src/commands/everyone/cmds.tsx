import Roact from '@rbxts/roact'
import { Popup } from 'components'
import { HttpService } from '@rbxts/services'
import { Message } from 'types'
import Trollsmile from 'index'
import { AutoResize } from 'utils'
export function run ({ author: plr }: Message, args: string[], bot: Trollsmile) {
  const Perm = bot.permission(plr.UserId)
  Roact.mount(
    <Popup name={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} commands`} Size={new UDim2(0, 400, 0, 500)}>
      <uilistlayout SortOrder={Enum.SortOrder.Name} Change={AutoResize} />
      {[...bot.commands].filter(([, { permission = 0 }]) => permission <= Perm).map(([name, { desc = 'this command does not have a description' }]) => {
        return <textlabel
          TextSize={25}
          AutomaticSize={Enum.AutomaticSize.Y}
          TextWrapped={true}
          TextXAlignment="Left"
          TextColor3={new Color3(1, 1, 1)}
          BorderSizePixel={0}
          Font="RobotoMono"
          Size={new UDim2(1, -5, 0, 50)}
          Key={name}
          BackgroundTransparency={1}
          Text={`${name} - ${desc}`} />
      })}
    </Popup>, plr.WaitForChild('PlayerGui'), HttpService.GenerateGUID(false))
}
export const desc = 'A list of commands.'
export const permission = 0
export const aliases = ['help', 'list', 'commands']

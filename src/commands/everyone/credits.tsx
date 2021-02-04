import { Players, HttpService } from '@rbxts/services'
import { Popup } from 'components'
import Roact from '@rbxts/roact'
import Trollsmile from 'index'
import { Message } from 'types'
import { AutoResize } from 'utils'

export const desc = 'trollsmile credits'
export const permission = 0
export const aliases = ['about', 'winning', 'trollsmile', 'meta']
function Credit ({ id, they }: { id: number, they?: string }) {
  return <frame BorderSizePixel={0} BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 50)}>
    <uilistlayout FillDirection="Horizontal" />
    <imagelabel
      BorderSizePixel={0}
      Image={Players.GetUserThumbnailAsync(id, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size420x420)[0]}
      Size={new UDim2(0, 50, 0, 50)}
    />
    {they ? (<frame BorderSizePixel={0} BackgroundTransparency={1} Size={new UDim2(0, 345, 0, 50)}>
      <uilistlayout FillDirection="Vertical" />
      <textlabel Text={Players.GetNameFromUserIdAsync(id)} Size={new UDim2(1, 0, .5, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={new Color3(1, 1, 1)}>
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <textlabel Text={they} Size={new UDim2(1, 0, .5, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={new Color3(.3, .3, .3)}>
        <uitextsizeconstraint MaxTextSize={20} />
      </textlabel>
    </frame>)
      : (<textlabel Text={Players.GetNameFromUserIdAsync(id)} Size={new UDim2(0, 345, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={new Color3(1, 1, 1)}>
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>)}
  </frame>
}
export function run ({ author: plr }: Message, args: string[], bot: Trollsmile) {
  Roact.mount(
    <Popup name={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} v${PKG_VERSION} credits`} Size={new UDim2(0, 400, 0, 500)}>
      {Roact.createElement('Sound', {
        Playing: true,
        Looped: true,
        Volume: 10,
        SoundId: 'rbxassetid://4185475912'
      })}
      <uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} Change={AutoResize} />
      <textlabel Text={"Developers"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={78711965} they="Maintainer of trollsmile" />
      <Credit id={1929053738} they='"""admin dev"""' />
      <textlabel Text={"Special thanks to"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={1308783007} they="He's LuaQuack" />
      <textlabel Text={"Uses libraries developed by"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={83348} they="roblox-ts" />
      <Credit id={92658764} they="Promises" />
      <Credit id={49352468} they="rbxts-transformer-services" />
    </Popup>, plr.WaitForChild('PlayerGui'), HttpService.GenerateGUID(false))
}

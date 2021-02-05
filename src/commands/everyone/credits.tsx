import { Players, HttpService, SoundService } from '@rbxts/services'
import { Popup } from 'components'
import Roact from '@rbxts/roact'
import Trollsmile from 'index'
import { Message } from 'types'
import { AutoResize, random } from 'utils'

export const desc = 'trollsmile credits'
export const permission = 0
export const aliases = ['about', 'winning', 'trollsmile', 'meta']
function Credit ({ id, they, onclick }: { id: number, they?: string, onclick?: (rbx: ImageButton) => unknown }) {
  return <frame BorderSizePixel={0} BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 50)}>
    <uilistlayout FillDirection="Horizontal" />
    {onclick ? <imagebutton
      BorderSizePixel={0}
      Image={Players.GetUserThumbnailAsync(id, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size420x420)[0]}
      Size={new UDim2(0, 50, 0, 50)}
      AutoButtonColor={false}
      Event={{
        MouseButton1Click: onclick
      }}
    /> : <imagelabel
      BorderSizePixel={0}
      Image={Players.GetUserThumbnailAsync(id, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size420x420)[0]}
      Size={new UDim2(0, 50, 0, 50)}
    />}
    {they ? (<frame BorderSizePixel={0} BackgroundTransparency={1} Size={new UDim2(0, 345, 0, 50)}>
      <uilistlayout FillDirection="Vertical" />
      <textlabel Text={Players.GetNameFromUserIdAsync(id)} Size={new UDim2(1, 0, .5, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)}>
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <textlabel Text={they} Size={new UDim2(1, 0, .5, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(.3, .3, .3)}>
        <uitextsizeconstraint MaxTextSize={20} />
      </textlabel>
    </frame>)
      : (<textlabel Text={Players.GetNameFromUserIdAsync(id)} Size={new UDim2(0, 345, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)}>
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
        Volume: 5,
        SoundId: 'rbxassetid://' + random([
          6101736348, // that one luaquack script
          1571897668, // Conro - On My Way Up
          952774272, // how
          1899417820, // rainbow hell
          2264258418, // rainbow puncher
          1214497430, // trollar
          // NERO'S DAY AT DISNEYLAND
          4185475912,
          919231299
        ])
      })}
      <uilistlayout SortOrder="LayoutOrder" Change={AutoResize} />
      <textlabel Text={"Developers"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={78711965} they="Maintainer of trollsmile" />
      <Credit id={1929053738} they='"""admin dev"""' />
      <textlabel Text={"Special thanks to"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={1308783007} they="She's LuaQuack" onclick={(rbx) => {
        const sound = new Instance('Sound', rbx)
        sound.Volume = 10
        sound.SoundId = 'rbxassetid://6345755361'
        sound.PlayOnRemove = true
        sound.Destroy()
      }} />
      <textlabel Text={"Uses libraries developed by"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={83348} they="roblox-ts" />
      <Credit id={92658764} they="Promises" />
      <Credit id={49352468} they="rbxts-transformer-services" />
    </Popup>, plr.WaitForChild('PlayerGui'), HttpService.GenerateGUID(false))
}

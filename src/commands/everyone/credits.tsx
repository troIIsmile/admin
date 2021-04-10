import { HttpService } from '@rbxts/services'
import { Popup, Credit } from 'components'
import Roact from '@rbxts/roact'
import Trollsmile from 'index'
import { message } from 'types'
import { random } from 'utils'

const songs = [
  6101736348, // that one luaquack script
  1571897668, // Conro - On My Way Up
  952774272, // how
  1899417820, // rainbow hell
  2264258418, // rainbow puncher
  1214497430, // you've been trolled
  1836553363, // sweet victory
  5938299491, // bobux
  869553580, // BFG Division
  1072940964 // steventhedreamer - Synchobonk
]
export const help = 'trollsmile credits'
export const permission = 0
export const aliases = ['about', 'winning', 'trollsmile', 'meta']

export function run ({ author: plr }: message, args: string[], bot: Trollsmile) {
  Roact.mount(
    <Popup name={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} v${PKG_VERSION} credits`} Size={new UDim2(0, 400, 0, 500)}>
      {Roact.createElement('Sound', {
        Playing: true,
        Looped: true,
        Volume: 5,
        SoundId: 'rbxassetid://' + random(songs)
      })}
      <uilistlayout SortOrder="LayoutOrder" />
      <textlabel Text={"Developers"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={78711965} they="Maintainer of trollsmile" />
      <Credit id={1929053738} they='"""admin dev"""' />
      <textlabel Text={"Special thanks to"} Size={new UDim2(1, 0, 0, 50)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={new Color3(1, 1, 1)} TextXAlignment="Center">
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <Credit id={1308783007} they="they do be luaquack" onclick={(rbx) => {
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

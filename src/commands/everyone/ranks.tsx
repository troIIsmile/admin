import { AutoResize } from 'utils'
import Roact from '@rbxts/roact'
import Bot from 'index'
import { Players } from '@rbxts/services'
import { Popup } from 'components'
import { Message } from 'types'
import Trollsmile from 'index'

function Ranks ({ Trollsmile: bot, You }: { Trollsmile: Bot, You: number }) {
  const white = new Color3(1, 1, 1)
  return [...bot.rankOf].map(([userid, rankname]) => {
    const name = Players.GetNameFromUserIdAsync(userid)
    return <frame Key={userid === You ? '!' : name} Size={new UDim2(1, -5, 0, 50)} BackgroundColor3={new Color3(0.3, 0.3, 0.3)}>
      <uilistlayout FillDirection={Enum.FillDirection.Horizontal} VerticalAlignment={Enum.VerticalAlignment.Center} />
      <imagelabel
        BorderSizePixel={0}
        Image={Players.GetUserThumbnailAsync(userid, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size420x420)[0]}
        Size={new UDim2(0, 50, 0, 50)}
      />
      <textlabel Text={name} Size={new UDim2(0, 195, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={white}>
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <textlabel Text={`${tostring((bot.ranks.get(rankname))!.permission)}\n(${rankname})`}
        Size={new UDim2(0, 50, 0, 50)}
        Font="RobotoMono"
        BorderSizePixel={0}
        BackgroundColor3={new Color3(0.25, 0.25, 0.25)}
        TextScaled={true}
        TextColor3={white} />
    </frame>
  })
}

export const run = function ({ author: plr }: Message, _: string[], bot: Trollsmile) {
  Roact.mount(
    <Popup name={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} ranks`} Size={new UDim2(0, 300, 0, 500)}>
      <uilistlayout SortOrder={Enum.SortOrder.Name} Change={AutoResize} />
      {Ranks({ Trollsmile: bot, You: plr.UserId })}
    </Popup>, plr.FindFirstChildWhichIsA('PlayerGui'), 'trollsmileRanks')
}
export const desc = 'see the ranks of all players that have joined this session'
export const permission = 0
export const aliases = ['admins', 'permission']

import { auto_resize } from 'utils'
import Roact from '@rbxts/roact'
import Bot from 'index'
import { Players } from '@rbxts/services'
import { Popup } from 'components'
import { message } from 'types'
import Trollsmile from 'index'

function Ranks ({ Trollsmile: bot, You }: { Trollsmile: Bot, You: number }) {
  const white = new Color3(1, 1, 1)
  return [...bot.rankOf].map(([user_id, rank_name]) => {
    const name = Players.GetNameFromUserIdAsync(user_id)
    return <frame Key={user_id === You ? '!' : name} Size={new UDim2(1, -5, 0, 50)} BackgroundColor3={new Color3(0.3, 0.3, 0.3)}>
      <uilistlayout FillDirection="Horizontal" VerticalAlignment="Center" />
      <imagelabel
        BorderSizePixel={0}
        Image={Players.GetUserThumbnailAsync(user_id, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size420x420)[0]}
        Size={new UDim2(0, 50, 0, 50)}
      />
      <textlabel Text={name} Size={new UDim2(0, 195, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled TextColor3={white}>
        <uitextsizeconstraint MaxTextSize={25} />
      </textlabel>
      <textlabel Text={`${tostring((bot.ranks.get(rank_name))!.permission)}\n(${rank_name})`}
        Size={new UDim2(0, 50, 0, 50)}
        Font="RobotoMono"
        BorderSizePixel={0}
        BackgroundColor3={new Color3(0.25, 0.25, 0.25)}
        TextScaled
        TextColor3={white} />
    </frame>
  })
}

export const run = function ({ author: plr }: message, _: string[], bot: Trollsmile) {
  Roact.mount(
    <Popup name={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} ranks`} Size={new UDim2(0, 300, 0, 500)}>
      <uilistlayout SortOrder="Name" Change={auto_resize} />
      {Ranks({ Trollsmile: bot, You: plr.UserId })}
    </Popup>, plr.FindFirstChildWhichIsA('PlayerGui'), 'trollsmileRanks')
}
export const desc = 'see the ranks of all players that have joined this session'
export const permission = 0
export const aliases = ['admins', 'permission', 'serverRanks', 'serverranks']

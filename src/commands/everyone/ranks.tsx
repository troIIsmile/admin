import { plrCommand } from 'utils'
import Roact from '@rbxts/roact'
import { Bot } from 'types'
import { Players } from '@rbxts/services'

function Center (props: { [Roact.Children]: Roact.Element | Roact.Element[] }) {
  return <frame BackgroundTransparency={1} BorderSizePixel={0} Key="center" Size={new UDim2(1, 0, 1, 0)}>
    <uilistlayout HorizontalAlignment={Enum.HorizontalAlignment.Center} VerticalAlignment={Enum.VerticalAlignment.Center} />
    {props[Roact.Children]}
  </frame>
}

function Ranks ({ Trollsmile: bot, You }: { Trollsmile: Bot, You: number }) {
  const white = new Color3(1, 1, 1)
  return <Roact.Fragment>
    <uilistlayout SortOrder={Enum.SortOrder.Name} />
    {bot.rankOf.entries().map(([userid, rankname]) => {
      const name = Players.GetNameFromUserIdAsync(userid)
      return <frame Key={userid === You ? '!' : name} Size={new UDim2(1, 0, 0, 50)} BackgroundColor3={new Color3(0.3, 0.3, 0.3)}>
        <uilistlayout FillDirection={Enum.FillDirection.Horizontal} VerticalAlignment={Enum.VerticalAlignment.Center} />
        <imagelabel
          BorderSizePixel={0}
          Image={Players.GetUserThumbnailAsync(userid, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size420x420)[0]}
          Size={new UDim2(0, 50, 0, 50)}
        />
        <textlabel Text={name} Size={new UDim2(0, 200, 1, 0)} BorderSizePixel={0} BackgroundTransparency={1} Font="Roboto" TextScaled={true} TextColor3={white}>
          <uitextsizeconstraint MaxTextSize={25}/>
        </textlabel>
        <textlabel Text={`${tostring((bot.ranks.get(rankname) || { permission: 0 }).permission)}\n(${rankname})`}
          Size={new UDim2(0, 50, 0, 50)}
          Font="RobotoMono"
          BorderSizePixel={0}
          BackgroundColor3={new Color3(0.25, 0.25, 0.25)}
          TextScaled={true}
          TextColor3={white} />
      </frame>
    })}
  </Roact.Fragment>
}

export const run = plrCommand(async (plr, bot) => {
  const white = new Color3(1, 1, 1)
  const padding = new UDim(0, 5)
  const ranks = Roact.mount(<screengui>
    <Center>
      <frame Key="Ranks" Size={new UDim2(0, 300, 0, 500)} BackgroundColor3={new Color3(0.1, 0.1, 0.1)} BorderSizePixel={0}>
        <frame Key="header" Size={new UDim2(1, 0, 0, 25)} BackgroundColor3={new Color3(0.25, 0.25, 0.25)} BorderSizePixel={0}>
          <uipadding PaddingLeft={padding} PaddingRight={padding} PaddingTop={padding} PaddingBottom={padding}></uipadding>
          <uilistlayout FillDirection={Enum.FillDirection.Horizontal} VerticalAlignment={Enum.VerticalAlignment.Center} />
          <textlabel
            Text={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} ranks`}
            TextScaled={true}
            Size={new UDim2(1, -20, 1, 0)}
            TextColor3={white}
            BackgroundTransparency={1}
            Font="RobotoMono"
            TextXAlignment={Enum.TextXAlignment.Left}
          />
          <textbutton BorderSizePixel={0} BackgroundColor3={new Color3(1, 0, 0)} TextColor3={white} Text="×" TextSize={20} Size={new UDim2(0, 25, 0, 25)} Event={{
            MouseButton1Click: () => Roact.unmount(ranks)
          }} />
        </frame>
        <scrollingframe VerticalScrollBarInset={Enum.ScrollBarInset.Always} CanvasSize={new UDim2(0, 0, 5, 0)} BackgroundTransparency={1} Key="list" Position={new UDim2(0, 0, 0, 25)} Size={new UDim2(1, 0, 1, -25)}>
          <Ranks Trollsmile={bot} You={plr.UserId} />
        </scrollingframe>
      </frame>
    </Center>
  </screengui>, plr.WaitForChild('PlayerGui'), 'trollsmileRanks')
})
export const desc = 'see the ranks of all players that have joined this session'
export const permission = 0
export const aliases = ['admins', 'permission']

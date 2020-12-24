import { plrCommand } from 'utils'
import Roact from '@rbxts/roact'
import Bot from 'index'
import { Center } from 'components'

function Commands ({ Trollsmile: bot, Perm }: { Trollsmile: Bot, Perm: number }) {
  const white = new Color3(1, 1, 1)
  return <Roact.Fragment>
    <uilistlayout SortOrder={Enum.SortOrder.Name} />
    {bot.commands.entries().filter(([, { permission = 0 }]) => permission <= Perm).map(([name, { desc = 'this command does not have a description' }]) => {
      return <textlabel TextSize={25} AutomaticSize={Enum.AutomaticSize.Y} TextWrapped={true} TextColor3={white} BorderSizePixel={0} Font="RobotoMono" Size={new UDim2(1, -5, 0, 50)} Key={name} BackgroundTransparency={1} Text={`${name} - ${desc}`}></textlabel>
    })}
  </Roact.Fragment>
}

export const run = plrCommand(async (plr, bot, permission) => {
  const white = new Color3(1, 1, 1)
  const padding = new UDim(0, 5)
  const ranks = Roact.mount(<screengui>
    <Center>
      <frame Key="Ranks" Size={new UDim2(0, 300, 0, 500)} BackgroundColor3={new Color3(0.1, 0.1, 0.1)} BorderSizePixel={0}>
        <frame Key="header" Size={new UDim2(1, 0, 0, 25)} BackgroundColor3={new Color3(0.25, 0.25, 0.25)} BorderSizePixel={0}>
          <uipadding PaddingLeft={padding} PaddingRight={padding} PaddingTop={padding} PaddingBottom={padding}></uipadding>
          <uilistlayout FillDirection={Enum.FillDirection.Horizontal} VerticalAlignment={Enum.VerticalAlignment.Center} />
          <textlabel
            Text={`${bot.brand === 'trollsmile' ? '^_^ trollsmile' : bot.brand} commands`}
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
        <scrollingframe ScrollBarThickness={5} CanvasSize={new UDim2(0, 0, 5, 0)} BackgroundTransparency={1} Key="list" Position={new UDim2(0, 0, 0, 25)} Size={new UDim2(1, 0, 1, -25)}>
          <Commands Trollsmile={bot} Perm={permission} />
        </scrollingframe>
      </frame>
    </Center>
  </screengui>, plr.WaitForChild('PlayerGui'), 'trollsmileCmds')
})
export const desc = 'A list of commands.'
export const permission = 0
export const aliases = ['help', 'list']

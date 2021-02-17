import Roact from '@rbxts/roact'
import { Debris, TweenService } from '@rbxts/services'
import { instances_of } from 'utils'

function remove_sounds (rbx: TextButton) {
  const gui = rbx.FindFirstAncestorWhichIsA('ScreenGui')
  if (gui) {
    instances_of(gui, 'Sound').forEach(sound => {
      sound.Parent = gui.Parent
      TweenService.Create(sound, new TweenInfo(5), {
        PlaybackSpeed: 0
      }).Play()
      Debris.AddItem(sound, 5)
    })

    gui.Destroy()
  }
}
export function Popup (
  {
    Size = new UDim2(0, 400, 0, 500), HeaderSize = 25, name, [Roact.Children]: child
  }: {
    [Roact.Children]: Roact.Element | (Roact.Element | Roact.Element[])[], name: string, Size?: UDim2, HeaderSize?: number
  }
) {
  const white = new Color3(1, 1, 1)
  const padding = new UDim(0, 5)
  return <screengui>
    {/* Center */}
    <uilistlayout HorizontalAlignment="Center" VerticalAlignment="Center" />
    <frame Key="Main" Size={Size} BackgroundColor3={new Color3(0.1, 0.1, 0.1)} BorderSizePixel={0}>
      <frame Key="header" Size={new UDim2(1, 0, 0, HeaderSize)} BackgroundColor3={new Color3(0.25, 0.25, 0.25)} BorderSizePixel={0}>
        <uipadding PaddingLeft={padding} PaddingRight={padding} PaddingTop={padding} PaddingBottom={padding} />
        <uilistlayout FillDirection="Horizontal" VerticalAlignment="Center" />
        <textlabel
          Text={name}
          TextScaled
          Size={new UDim2(1, -20, 1, 0)}
          TextColor3={white}
          BackgroundTransparency={1}
          Font="RobotoMono"
          TextXAlignment="Left"
        />
        <textbutton BorderSizePixel={0} BackgroundColor3={new Color3(1, 0, 0)} TextColor3={white} Text="×" TextSize={20} Size={new UDim2(0, 25, 0, 25)} Event={{
          MouseButton1Click: remove_sounds
        }} />
      </frame>
      <scrollingframe AutomaticCanvasSize={Enum.AutomaticSize.Y} ScrollBarThickness={5} CanvasSize={new UDim2(0, 0, 0, 0)} BackgroundTransparency={1} Key="list" Position={new UDim2(0, 0, 0, 25)} Size={new UDim2(1, 0, 1, -25)}>
        {child}
      </scrollingframe>
    </frame>
  </screengui>
}

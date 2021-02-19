import Roact from '@rbxts/roact'
import { Debris as debris, TweenService as tween_service } from '@rbxts/services'
import { instances_of } from 'utils'

function remove_sounds (rbx: TextButton) {
  const gui = rbx.FindFirstAncestorWhichIsA('ScreenGui')
  if (gui) {
    instances_of(gui, 'Sound').forEach(sound => {
      sound.Parent = gui.Parent
      tween_service.Create(sound, new TweenInfo(5), {
        PlaybackSpeed: 0
      }).Play()
      debris.AddItem(sound, 5)
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


export class Notification extends Roact.Component<{ text: string; showFor?: number, onClick?: () => {} }> {
  frame: Roact.Ref<TextButton> | undefined

  render () {
    this.frame = Roact.createRef<TextButton>()
    function out (rbx: TextButton) {

      tween_service.Create(rbx, new TweenInfo(1), {
        Position: new UDim2(1, 0, 1, -100),
        Rotation: -45
      }).Play()
      const screen_gui = rbx.FindFirstAncestorWhichIsA('ScreenGui')
      if (screen_gui) debris.AddItem(screen_gui, 1)
    }
    const { text, onClick: onClick } = this.props
    return <screengui ZIndexBehavior="Sibling">
      <textbutton
        Ref={this.frame}
        Text=""
        BackgroundColor3={new Color3(1, 1, 1)}
        Rotation={45}
        Position={new UDim2(1, 0, 1, -100)}
        BorderSizePixel={0}
        Size={new UDim2(0, 200, 0, 50)}
        AutoButtonColor={false}
        Event={{
          MouseButton1Click: (rbx: TextButton) => {
            if (onClick) onClick()
            out(rbx)
          }
        }}>
        <imagelabel
          ZIndex={5}
          BorderSizePixel={0}
          Size={new UDim2(0, 50, 0, 50)}
          BackgroundTransparency={1}
          Image="rbxassetid://6110686361"
        />
        <textlabel
          TextWrapped
          TextXAlignment="Right"
          TextSize={15}
          Text={text}
          Size={new UDim2(1, -50, 1, 0)}
          Position={new UDim2(0, 50, 0, 0)}
          TextColor3={new Color3(0, 0, 0)}
          BorderSizePixel={0}
          BackgroundTransparency={1}
          Font="Roboto"
          TextYAlignment="Center"
        />
      </textbutton>
    </screengui>
  }
  didMount () {
    const frame = this.frame?.getValue()
    if (!frame) return
    const sound = new Instance("Sound", frame)
    sound.SoundId = 'rbxassetid://6366788549'
    sound.PlayOnRemove = true
    sound.Volume = 10
    sound.Destroy()
    // Animation.
    tween_service.Create(frame, new TweenInfo(1), {
      Position: new UDim2(1, -250, 1, -100),
      Rotation: 0
    }).Play()
    wait(this.props.showFor ?? 3)
    debris.AddItem(frame.FindFirstAncestorWhichIsA('ScreenGui') || frame, 1)
    tween_service.Create(frame, new TweenInfo(1), {
      Position: new UDim2(1, 0, 1, -100),
      Rotation: -45
    }).Play()
  }
}

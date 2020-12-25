import Roact from '@rbxts/roact'
export function Center (props: { [Roact.Children]: Roact.Element | Roact.Element[] }) {
  return <frame BackgroundTransparency={1} BorderSizePixel={0} Key="center" Size={new UDim2(1, 0, 1, 0)}>
    <uilistlayout HorizontalAlignment={Enum.HorizontalAlignment.Center} VerticalAlignment={Enum.VerticalAlignment.Center} />
    {props[Roact.Children]}
  </frame>
}

export function Popup ({ Size = new UDim2(0, 400, 0, 500), HeaderSize = 25, name, [Roact.Children]: child }: { [Roact.Children]: Roact.Element | Roact.Element[], name: string, Size?: UDim2, HeaderSize?: number }) {
  const white = new Color3(1, 1, 1)
  const padding = new UDim(0, 5)
  return <screengui>
    <Center>
      <frame Key="Main" Size={Size} BackgroundColor3={new Color3(0.1, 0.1, 0.1)} BorderSizePixel={0}>
        <frame Key="header" Size={new UDim2(1, 0, 0, HeaderSize)} BackgroundColor3={new Color3(0.25, 0.25, 0.25)} BorderSizePixel={0}>
          <uipadding PaddingLeft={padding} PaddingRight={padding} PaddingTop={padding} PaddingBottom={padding}></uipadding>
          <uilistlayout FillDirection={Enum.FillDirection.Horizontal} VerticalAlignment={Enum.VerticalAlignment.Center} />
          <textlabel
            Text={name}
            TextScaled={true}
            Size={new UDim2(1, -20, 1, 0)}
            TextColor3={white}
            BackgroundTransparency={1}
            Font="RobotoMono"
            TextXAlignment={Enum.TextXAlignment.Left}
          />
          <textbutton BorderSizePixel={0} BackgroundColor3={new Color3(1, 0, 0)} TextColor3={white} Text="×" TextSize={20} Size={new UDim2(0, 25, 0, 25)} Modal={true} Event={{
            MouseButton1Click: rbx => {
              const gui = rbx.FindFirstAncestorWhichIsA('ScreenGui')
              if (gui) gui.Destroy()
            }
          }} />
        </frame>
        <scrollingframe ScrollBarThickness={5} CanvasSize={new UDim2(0, 0, 5, 0)} BackgroundTransparency={1} Key="list" Position={new UDim2(0, 0, 0, 25)} Size={new UDim2(1, 0, 1, -25)}>
          {child}
        </scrollingframe>
      </frame>
    </Center>
  </screengui>
}

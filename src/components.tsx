import Roact from '@rbxts/roact'
export function Center (props: { [Roact.Children]: Roact.Element | Roact.Element[] }) {
  return <frame BackgroundTransparency={1} BorderSizePixel={0} Key="center" Size={new UDim2(1, 0, 1, 0)}>
    <uilistlayout HorizontalAlignment={Enum.HorizontalAlignment.Center} VerticalAlignment={Enum.VerticalAlignment.Center} />
    {props[Roact.Children]}
  </frame>
}

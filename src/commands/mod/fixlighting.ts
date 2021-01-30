import { Lighting, Debris } from '@rbxts/services'
const originalChildren = Lighting.GetDescendants()
const oldProps = {
  Brightness: Lighting.Brightness,
  Ambient: Lighting.Ambient,
  ClockTime: Lighting.ClockTime,
  ColorShift_Bottom: Lighting.ColorShift_Bottom,
  ColorShift_Top: Lighting.ColorShift_Top,
  EnvironmentDiffuseScale: Lighting.EnvironmentDiffuseScale,
  EnvironmentSpecularScale: Lighting.EnvironmentSpecularScale,
  ExposureCompensation: Lighting.ExposureCompensation,
  FogColor: Lighting.FogColor,
  FogEnd: Lighting.FogEnd,
  FogStart: Lighting.FogStart,
  GeographicLatitude: Lighting.GeographicLatitude,
  OutdoorAmbient: Lighting.OutdoorAmbient,
  ShadowSoftness: Lighting.ShadowSoftness,
  GlobalShadows: Lighting.GlobalShadows
}
export function run (): void {
  // Delete anything that wasn't already there
  Lighting.GetDescendants().forEach(instance => {
    if (!originalChildren.includes(instance)) {
      Debris.AddItem(instance, 0)
    }
  })
  // Reset the Lighting to its original state
  for (const [key, originalValue] of pairs(oldProps)) {
    Lighting[key] = originalValue as never // wtf is roblox-ts
  }
}
export const desc = 'who screwed up the lighting'
export const permission = 2
export const aliases = ['fl', 'fixlight', 'fixLighting', 'fixLightning', 'fixlightning']

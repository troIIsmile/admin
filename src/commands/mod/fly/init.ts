import { plrCommand } from 'utils'
declare const script: ModuleScript & {
  Fly: LocalScript
}
export const run = plrCommand(plr => {
  const gui = plr.WaitForChild('PlayerGui')
  const fly = script.Fly.Clone()
  fly.Parent = gui
  fly.Disabled = false
})
export const desc = 'how'
export const permission = 2
export const aliases = ['whee']

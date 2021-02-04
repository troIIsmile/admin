import { plrCommand } from 'utils'

export const run = plrCommand(plr => {
  const fly = plr.FindFirstChildWhichIsA('PlayerGui')?.FindFirstChild('Fly')
  if (fly && fly.IsA('Script')) {
    fly.Disabled = true
    fly.Destroy()
  }
})
export const desc = 'aww now i cant fly'
export const permission = 2
export const aliases = ['aaaa']

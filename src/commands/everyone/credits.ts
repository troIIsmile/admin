import { Players } from '@rbxts/services'

export const desc = 'trollsmile credits'
export const permission = 0
export const run = () => `

trollsmile-admin by Jack (${Players.GetNameFromUserIdAsync(78711965)} on Roblox)
powered by roblox-ts
command handler from trollsmile-djs by Jack

`.split('\n').map(line => line.trim()).filter(a=>!!a.size()).join('\n').trim()

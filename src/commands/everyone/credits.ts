export const desc = 'trollsmile credits'
export const permission = 0
export const run = () => `

trollsmile-admin by Jack
powered by roblox-ts
${Players.GetNameFromUserIdAsync(458316463)} is nice :D
command handler from trollsmile-djs by Jack

`.split('\n').map(line => line.trim()).filter(a=>!!a.size()).join('\n').trim()

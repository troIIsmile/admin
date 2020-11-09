export const desc = 'trollsmile credits'
export const permission = 0
export function run () {
  return `
  trollsmile-admin by Jack
  powered by roblox-ts
  command handler from trollsmile-djs by Jack
  `.split('\n').map(line=>line.trim()).join('\n').trim()
}
